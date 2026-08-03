import { LoginType } from "@redrope/shared";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto implements LoginType {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  password!: string;
}
