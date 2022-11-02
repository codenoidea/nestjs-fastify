import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { MasterUserService } from './master-user/master-user.service';
import { CreateMasterUserDto } from './master-user/dto/create-master-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private masterUserService: MasterUserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('join')
  async join(@Body() createMasterUserDto: CreateMasterUserDto) {
    return await this.masterUserService.create(createMasterUserDto);
  }

  @Get()
  async health() {
    return 'success';
  }

  @Get('auth/info')
  async info(@Request() req) {
    return this.authService.info(req);
  }
}
