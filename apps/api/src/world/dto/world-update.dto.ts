import { IsNotEmpty, IsString } from "class-validator";

export class WorldUpdateDto {
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
