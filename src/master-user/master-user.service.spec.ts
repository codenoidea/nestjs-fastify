import { Test, TestingModule } from '@nestjs/testing';
import { MasterUserService } from './master-user.service';

describe('MasterUserService', () => {
  let service: MasterUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterUserService],
    }).compile();

    service = module.get<MasterUserService>(MasterUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
