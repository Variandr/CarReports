import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../common/schemas/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema) private repo: Repository<UserSchema>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOneBy(query: FindOptionsWhere<UserSchema>) {
    return await this.repo.findOneBy(query);
  }

  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password });
    if (!user) {
      throw new NotFoundException('User was not created');
    }
    return user;
  }

  async save(user: UserSchema) {
    return await this.repo.save(user);
  }
}
