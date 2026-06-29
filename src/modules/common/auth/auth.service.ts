import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCommon } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByLoginAndPassword(username, password);

    if (!user) {
      throw new Error('User Not Found');
    }

    return user;
  }

  async validateUserById(id: number): Promise<UserCommon | null> {
    return this.usersService.findById(id);
  }

  generateToken(userId: number) {
    return this.jwtService.sign({ sub: userId });
  }
}