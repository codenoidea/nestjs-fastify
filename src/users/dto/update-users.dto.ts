import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
