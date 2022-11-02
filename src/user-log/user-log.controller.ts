import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';

@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Post()
  create(@Body() createUserLogDto: CreateUserLogDto) {
    return this.userLogService.create(createUserLogDto);
  }

  @Get()
  findAll() {
    return this.userLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLogDto: UpdateUserLogDto) {
    return this.userLogService.update(+id, updateUserLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogService.remove(+id);
  }
}
