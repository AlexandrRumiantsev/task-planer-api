import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCommon } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserCommon)
    private readonly usersRepository: Repository<UserCommon>,
  ) {}

  async findAll(): Promise<UserCommon[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<UserCommon | null> {
    return await this.usersRepository.findOne({ where: { id } as any });
  }

  async create(userData: Partial<UserCommon>): Promise<UserCommon> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async findByLoginAndPassword(login: string, plainPassword: string): Promise<UserCommon | null | string> {

    const user = await this.usersRepository.findOne({
      where: { login },
    });

    if (!user) {
      return null;
    }
    
    const isPasswordValid = await this.comparePassword(plainPassword, user.password);

    if (isPasswordValid) {
      console.log('Пароль верный, вход разрешен');
      return user;
    } else {
      console.log('Неверный пароль');
      return null;
    }
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<Boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}