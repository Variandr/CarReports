import { Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(email: string, password: string) {
    const user = await this.userService.findOneBy({ email: email });
    if (user) {
      throw new NotFoundException('User with this email already exists');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const encryptedPassword = salt + '.' + hash.toString('hex');
    const newUser = await this.userService.create(email, encryptedPassword);
    return await this.userService.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const [salt, hash] = user.password.split('.');
    const encryptedPassword = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== encryptedPassword.toString('hex')) {
      throw new Error('Wrong email or password');
    }
    Object.assign(user, { online: true });
    return await this.userService.save(user);
  }
}
