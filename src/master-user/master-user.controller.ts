import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MasterUserService } from './master-user.service';
import { master_user } from './master-user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMasterUserDto } from './dto/create-master-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('master-user')
export class MasterUserController {
  constructor(private readonly masterUserService: MasterUserService) {}

  @Post()
  async create(@Body() createMasterUserDto: CreateMasterUserDto) {
    await this.masterUserService.create(createMasterUserDto);
  }

  @Get()
  findAll(): Promise<master_user[]> {
    return this.masterUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<master_user> {
    return this.masterUserService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() masterUser: master_user,
  ): Promise<void> {
    await this.masterUserService.update(+id, masterUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.masterUserService.remove(+id);
  }
}
