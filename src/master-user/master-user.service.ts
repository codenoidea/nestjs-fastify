import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { master_user } from './master-user.entity';
import * as bcrypt from 'bcrypt';
import { CreateMasterUserDto } from './dto/create-master-user.dto';

@Injectable()
export class MasterUserService {
  constructor(
    @InjectRepository(master_user)
    private masterUserRepository: Repository<master_user>,
  ) {}

  async create(createMasterUserDto: CreateMasterUserDto) {
    const { email, name, password } = createMasterUserDto;
    const saltOrRounds = 10;
    const passwordCrypt = await bcrypt.hash(password, saltOrRounds);
    const data = {
      email,
      name,
      password: passwordCrypt,
    };
    return this.masterUserRepository.save(data);
  }

  async findAll(): Promise<master_user[]> {
    return this.masterUserRepository.find();
  }

  async findOne(id: number) {
    return this.masterUserRepository.findOneBy({ id });
  }

  async findEmail(email: string) {
    return this.masterUserRepository.findOneBy({ email: email });
  }

  async update(id: number, masteruser: master_user): Promise<void> {
    const masterUser = await this.masterUserRepository.findOneBy({ id });
    masterUser.name = masteruser.name;
    await this.masterUserRepository.save(masterUser);
  }

  async remove(id: number): Promise<void> {
    await this.masterUserRepository.delete(id);
  }
}
