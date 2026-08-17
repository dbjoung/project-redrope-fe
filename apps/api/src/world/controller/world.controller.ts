import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthRequest } from "@src/common/type/auth.type";
import { WorldService } from "../service/world.service";
import { WorldCreateDto } from "../dto/world-create.dto";

@Controller("world")
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get()
  getWorlds(@Req() req: AuthRequest) {
    const userId = req.user.userId;
    return this.worldService.findAll(userId);
  }

  @Post()
  createWorld(@Req() req: AuthRequest, @Body() worldCreateDto: WorldCreateDto) {
    const userId = req.user.userId;
    return this.worldService.createWorld(userId, worldCreateDto);
  }
}
