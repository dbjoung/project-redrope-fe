import { InjectRepository } from "@nestjs/typeorm";
import { World } from "../entity/world.entity";
import { DataSource, Repository } from "typeorm";
import { UserWorld } from "@src/world/entity/user_world.entity";
import { WorldSummaryWithRole } from "../dto/world.dto";
import { WorldCreateDto } from "../dto/world-create.dto";
import { WorldRole } from "../common/world.role";
import {
  WorldDeleteForbiddenException,
  WorldJoinConflictException,
  WorldNotFoundException,
} from "../common/world.exception";

export class WorldService {
  constructor(
    @InjectRepository(World) private readonly worldRepository: Repository<World>,
    @InjectRepository(UserWorld) private readonly uwRepository: Repository<UserWorld>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(userId: string) {
    return await this.worldRepository
      .createQueryBuilder("world")
      .select(["world.id", "world.title", "world.description, userWorld.role"])
      .innerJoin(UserWorld, "userWorld", "userWorld.worldId = world.id")
      .where("userWorld.userId = :userId", { userId })
      .getRawMany<WorldSummaryWithRole>();
  }

  async createWorld(userId: string, dto: WorldCreateDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      const newWorld = manager.create(World, {
        title: dto.title,
        description: dto.description,
      });

      const world = await manager.save(newWorld);
      const newUserWorld = manager.create(UserWorld, {
        user: { id: userId },
        world,
        role: WorldRole.OWNER,
      });
      await manager.save(newUserWorld);

      await queryRunner.commitTransaction();
      return world;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async joinWorld(userId: string, dto: { worldId: number }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      const isJoined = !!(await manager.findOne(UserWorld, {
        where: {
          user: { id: userId },
          world: { id: dto.worldId },
        },
      }));

      if (isJoined) throw WorldJoinConflictException();

      const newUserWorld = manager.create(UserWorld, {
        user: { id: userId },
        world: { id: dto.worldId },
        role: WorldRole.MEMBER,
      });

      await manager.save(newUserWorld);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async softDeleteWorld(userId: string, dto: { worldId: number }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    const userWorld = await this.uwRepository.findOneOrFail({
      where: { user: { id: userId }, world: { id: dto.worldId } },
    });

    if (userWorld.role !== WorldRole.OWNER) throw WorldDeleteForbiddenException();

    try {
      const resultWorldDelete = await manager.softDelete(World, dto.worldId);
      if (resultWorldDelete.affected !== 1) throw WorldNotFoundException();

      const resultMemberDelete = await manager.delete(UserWorld, {
        World: { id: dto.worldId },
      });

      if (resultMemberDelete.affected !== 1) throw WorldNotFoundException();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
