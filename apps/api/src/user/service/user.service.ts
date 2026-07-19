import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import {
  UserCreationException,
  UserDeleteException,
  UserNotFoundException,
  UserUpdateException,
} from "../exception/user.exception";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser).catch(() => {
      throw UserCreationException();
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find().catch(() => {
      throw UserNotFoundException();
    });
  }

  async findOne(key: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    const user = await this.userRepository.findOneBy(key).catch(() => {
      throw UserNotFoundException();
    });

    if (!user) throw UserNotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.userRepository.update(id, updateUserDto).catch(() => {
      throw UserUpdateException();
    });
  }

  async remove(id: string) {
    this.userRepository.softDelete(id).catch(() => {
      throw UserDeleteException();
    });
  }
}
