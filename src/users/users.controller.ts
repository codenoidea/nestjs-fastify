import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AnyFilesFastifyInterceptor,
  FileFastifyInterceptor,
  FileFieldsFastifyInterceptor,
  FilesFastifyInterceptor,
  MulterFile,
} from 'fastify-file-interceptor';
import { diskStorage } from 'multer';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/csv')
  findAllCsv(): Promise<users[]> {
    return this.usersService.findAll();
  }

  @Get('/')
  find(
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('search') search: string,
  ): Promise<any> {
    return this.usersService.findPaging({ limit, page, search });
  }

  @Post('/upload')
  @UseInterceptors(FileFastifyInterceptor('file', {}))
  uploadNewUserExcel(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.usersService.uploadNewUserExcel({ file });
  }
}
