import { IsNotEmpty, IsString, Length } from "class-validator";
import { signInType } from "@redrope/shared/dist/user";
export class CreateUserDto implements signInType {
  @IsNotEmpty()
  @IsString()
  nickname!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  password!: string;
}
