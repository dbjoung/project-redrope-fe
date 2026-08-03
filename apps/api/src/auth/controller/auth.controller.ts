import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Req } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/auth-login.dto";
import { Response, Request } from "express";
import { cUnauthorizedException } from "../exception/auth.exception";
import { Public } from "@src/common/decorator/public.decorator";
import { UserService } from "@src/user/service/user.service";
import { CreateUserDto } from "@src/user/dto/create-user.dto";
import { ResponseUser } from "@src/user/dto/response-user.dto";
import ResponseMessage from "@src/common/dto/response-message.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() signDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, ...user } = await this.authService.signIn(
      signDto.email,
      signDto.password,
    );

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return { accessToken, ...user };
  }

  @Public()
  @Get("refresh")
  async getNewAccessToken(@Req() req: Request) {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) throw cUnauthorizedException("RefreshToken이 없습니다.");

    const { newAccessToken, userId } = await this.authService.confirmRefreshToken(refreshToken);

    const user = this.userService.findOne({
      id: userId,
    });
    return { accessToken: newAccessToken, ...user };
  }

  @Public()
  @Post("join")
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUser> {
    return ResponseUser.from(await this.userService.create(createUserDto));
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) throw cUnauthorizedException("RefreshToken이 없습니다.");

    await this.authService.logout(refreshToken);

    res.cookie("refreshToken", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return new ResponseMessage("로그아웃 되었습니다.");
  }
}
