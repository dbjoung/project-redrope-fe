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
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({
    summary: "사용자 로그인",
    description: "사용자 로그인 api입니다.",
  })
  @ApiOkResponse({
    description: "로그인 성공",
  })
  @ApiUnauthorizedResponse({
    description: "이메일 또는 비밀번호가 올바르지 않습니다.",
  })
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
  @ApiOperation({
    summary: "Access Token 발급",
    description: "새로운 Access Token을 발급합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "Access Token 발급 성공",
  })
  @ApiUnauthorizedResponse({
    description: "Resfresh Token이 없습니다.",
  })
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
  @ApiOperation({
    summary: "회원가입",
    description: "새로운 회원을 추가합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "회원 가입 성공",
  })
  @ApiResponse({
    status: 404,
    description: "회원 가입 실패",
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUser> {
    return ResponseUser.from(await this.userService.create(createUserDto));
  }

  @Get("logout")
  @Public()
  @Post("join")
  @ApiOperation({
    summary: "로그아웃",
    description: "로그아웃합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "로그아웃 성공",
  })
  @ApiUnauthorizedResponse({
    description: "Resfresh Token이 없습니다.",
  })
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
