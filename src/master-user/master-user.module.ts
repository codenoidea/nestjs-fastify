import { Module } from '@nestjs/common';
import { MasterUserService } from './master-user.service';
import { MasterUserController } from './master-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { master_user } from './master-user.entity';

@Module({
  controllers: [MasterUserController],
  exports: [MasterUserService],
  imports: [TypeOrmModule.forFeature([master_user])],
  providers: [MasterUserService],
})
export class MasterUserModule {}
