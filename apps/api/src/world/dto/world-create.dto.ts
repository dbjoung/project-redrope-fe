import { IsNotEmpty, IsString } from "class-validator";

export class WorldCreateDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  slug!: string;
}
