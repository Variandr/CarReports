import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../schema/user.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(Auth) private repo: Repository<Auth>) {
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOneBy(query: FindOptionsWhere<Auth>) {
    return await this.repo.findOneBy(query);
  }

  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password: password, online: true });
    if (!user) {
      throw new NotFoundException("UserDtos was not created");
    }
    return user;
  }

  async save(user: Auth) {
    return await this.repo.save(user);
  }

  async remove(user: Auth) {
    return await this.repo.remove(user);
  }
}
