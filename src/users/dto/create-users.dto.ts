import { IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  readonly title: string;

  @IsString()
  status: string;

  @IsString()
  name: string;
}
