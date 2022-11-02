import { IsString, IsEmail } from 'class-validator';

export class CreateMasterUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
