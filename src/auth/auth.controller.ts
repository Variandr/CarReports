import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Session } from "@nestjs/common";
import { Auth, Update, User } from "./dtos/dtos";
import { AuthService } from "./auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";


@Serialize(User)
@Controller("user")
export class AuthController {
  constructor(private service: AuthService) {
  }

  @Get()
  async getUsers() {
    return this.service.getUsers();
  }

  @Post("/register")
  async register(@Body() body: Auth, @Session() session: any) {
    const user = await this.service.register(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Put("/login")
  async login(@Body() body: Auth, @Session() session: any) {
    const user = await this.service.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Patch("/update")
  async updatePassword(@Body() body: Update) {
    return this.service.updatePassword(body.id, body);
  }

  @Delete("/logout/:id")
  async logout(@Param("id") id: number, @Session() session: any) {
    session.userId = undefined;
    return this.service.logout(id);
  }

  @Delete("/delete/:id")
  async deleteUser(@Param("id") id: number) {
    return this.service.deleteUser(id);
  }
}
