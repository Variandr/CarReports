import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./auth.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(Auth) private repo: Repository<Auth>) {
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOneById(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return user;
  }

}
