import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { ResponseUser } from "../dto/response-user.dto";
import ResponseMessage from "@src/common/dto/response-message.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUser> {
    return ResponseUser.from(await this.userService.create(createUserDto));
  }

  @Get()
  async findAll(): Promise<ResponseUser[]> {
    const users = await this.userService.findAll();
    return users.map((user) => ResponseUser.from(user));
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const findedUser = await this.userService.findOne({
      id,
    });
    if (findedUser) return ResponseUser.from(findedUser);
    else return null;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
    return new ResponseMessage("GGG");
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
