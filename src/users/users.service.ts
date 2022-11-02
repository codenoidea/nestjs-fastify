import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import * as CryptoJS from 'crypto-js';
import * as passwordHash from 'password-hash';
import xlsx from 'node-xlsx';
const key = 'crossbim2019!@#';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,
  ) {}

  async create(user: users[]): Promise<users[]> {
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<users[]> {
    const list = await this.usersRepository.find();

    await this.setDecrypto({ list });

    return list;
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async findEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'full_name'],
    });
  }

  async findPaging(data: any): Promise<any> {
    const { limit = 50, page = 1, search = undefined } = data;
    const offset = (page - 1) * limit;

    let whereSearch = ' 1=1 ';
    let whereSearchObject = {};
    if (search) {
      whereSearch = `full_name like :search`;
      whereSearchObject = { search: `%${search}%` };
    }

    const parallelData = [];
    parallelData.push(
      this.usersRepository
        .createQueryBuilder('users')
        .andWhere(whereSearch, whereSearchObject)
        .getCount(),
    );

    parallelData.push(
      this.usersRepository
        .createQueryBuilder('users')
        .select([
          'id',
          'full_name',
          'email',
          'companyName',
          'position',
          'phone_number',
          'created_at',
        ])
        .andWhere(whereSearch, whereSearchObject)
        .limit(limit)
        .offset(offset)
        .orderBy('id', 'DESC')
        .getRawMany(),
    );

    const [count, list] = await Promise.all(parallelData);

    await this.setDecrypto({ list });

    return { count, list };
  }

  async setDecrypto(params) {
    const { list } = params;
    for (const l of list) {
      const { phone_number } = l;
      if (phone_number) {
        try {
          const bytes = CryptoJS.AES.decrypt(phone_number, key);
          const descriptPhoneNumber = bytes.toString(CryptoJS.enc.Utf8);

          if (descriptPhoneNumber) {
            l.phone_number = descriptPhoneNumber;
          }
        } catch (error) {}
      }
    }
  }

  @Transactional()
  async uploadNewUserExcel(data: any): Promise<any> {
    const { file } = data;

    const workSheetsFromFile = xlsx.parse(file.buffer);
    const sheetLength = workSheetsFromFile[0].data.length;
    const parallelData = [];
    for (let i = 0; i < sheetLength; i++) {
      const cell = workSheetsFromFile[0].data[i];
      const email = cell[1];
      const name = cell[2];
      if (i > 0 && email && name) {
        let nameNo = name;
        const password = passwordHash.generate('abcd123456');

        const emailCount = await this.usersRepository.countBy({ email });
        if (emailCount === 0) {
          const nameCount = await this.usersRepository.countBy({
            full_name: name,
          });
          if (nameCount > 0) {
            nameNo = `${name}${nameCount + 1}`;
          }

          parallelData.push(
            this.usersRepository.save({
              email,
              full_name: nameNo,
              password,
            }),
          );
        }
      }
    }
    await Promise.all(parallelData);
  }
}
