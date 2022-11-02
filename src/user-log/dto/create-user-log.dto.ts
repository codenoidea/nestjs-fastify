import { IsNumber, IsString } from 'class-validator';

export class CreateUserLogDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  created_at: string;
}
