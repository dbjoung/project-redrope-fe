import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthRequest } from "@src/common/type/auth.type";
import { WorldService } from "../service/world.service";
import { WorldCreateDto } from "../dto/world-create.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("world")
@ApiTags("World API")
@ApiBearerAuth("access-token")
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get()
  @ApiOperation({
    summary: "내 세계 조회",
    description: "내 세계를 조회합니다. (Owner, Member)",
  })
  @ApiResponse({
    status: 201,
    description: "세계 조회 성공",
  })
  getWorlds(@Req() req: AuthRequest) {
    const userId = req.user.userId;
    return this.worldService.findAll(userId);
  }

  @Post()
  @ApiOperation({
    summary: "세계 생성",
    description: "새로운 세계를 생성합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "세계 생성 성공",
  })
  @ApiResponse({
    status: 409,
    description: "slug 중복",
  })
  createWorld(@Req() req: AuthRequest, @Body() worldCreateDto: WorldCreateDto) {
    const userId = req.user.userId;
    return this.worldService.createWorld(userId, worldCreateDto);
  }
}
