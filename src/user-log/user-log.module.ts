import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { UserLog } from './entities/user-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserLogController],
  providers: [UserLogService],
  imports: [TypeOrmModule.forFeature([UserLog])],
})
export class UserLogModule {}
