import { Injectable, NotFoundException } from '@nestjs/common';
import { MasterUserService } from '../master-user/master-user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private masterUsersService: MasterUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (email !== 'support@crossteam.co.kr') {
      throw new NotFoundException(`이메일 또는 비밀번호를 확인해주세요.`);
    }
    const user = await this.masterUsersService.findEmail(email);

    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const { ...result } = user;
        return result;
      }
    }

    throw new NotFoundException(`이메일 또는 비밀번호를 확인해주세요.`);
  }

  async login(user: any) {
    const payload = { id: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async info(req: any) {
    const { authorization } = req.headers;
    const token = authorization.replace('bearer ', '');
    const decoded: any = this.jwtService.decode(token);
    const { id } = decoded;
    const result = await this.masterUsersService.findOne(id);
    result.password = undefined;
    result.updatedAt = undefined;
    return result;
  }
}
