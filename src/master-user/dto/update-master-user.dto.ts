import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterUserDto } from './create-master-user.dto';

export class UpdateMasterUserDto extends PartialType(CreateMasterUserDto) {}
