import { Test, TestingModule } from '@nestjs/testing';
import { MasterUserController } from './master-user.controller';
import { MasterUserService } from './master-user.service';

describe('MasterUserController', () => {
  let controller: MasterUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterUserController],
      providers: [MasterUserService],
    }).compile();

    controller = module.get<MasterUserController>(MasterUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
