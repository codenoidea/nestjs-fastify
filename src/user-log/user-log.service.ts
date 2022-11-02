import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';

@Injectable()
export class UserLogService {
  create(createUserLogDto: CreateUserLogDto) {
    return 'This action adds a new userLog';
  }

  findAll() {
    return `This action returns all userLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLog`;
  }

  update(id: number, updateUserLogDto: UpdateUserLogDto) {
    return `This action updates a #${id} userLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLog`;
  }
}
