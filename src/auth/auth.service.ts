import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Auth } from "./auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private repo: Repository<Auth>) {
  }

  async getUsers() {
    return await this.repo.find();
  }

  async register(email: string, password: string) {
    const user = await this.repo.findOneBy({ email: email });
    if (user) {
      throw new NotFoundException("User with this email already exists");
    }
    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(password, salt, 32) as Buffer);
    const encryptedPassword = salt + "." + hash.toString("hex");
    const newUser = await this.repo.create({ email, password: encryptedPassword, online: true });
    return await this.repo.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    const [salt, hash] = user.password.split(".");
    const encryptedPassword = (await scrypt(password, salt, 32) as Buffer);
    if (hash !== encryptedPassword.toString("hex")) {
      throw new Error("Wrong email or password");
    }
    Object.assign(user, { online: true });
    return await this.repo.save(user);
  }

  async updatePassword(id: number, updateParams: Partial<Auth>) {
    const user = await this.repo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    Object.assign(user, updateParams);
    return await this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.repo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return await this.repo.remove(user);
  }

  async logout(id: number) {
    const user = await this.repo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    Object.assign(user, { online: false });
    return await this.repo.save(user);
  }
}
