import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string = "";

  @IsNotEmpty()
  @IsString()
  email: string = "";

  @IsNotEmpty()
  @IsString()
  @Length(10)
  password: string = "";
}
