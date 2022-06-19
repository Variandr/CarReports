import { Body, Controller, Delete, Get, Post, Put, Session, UseGuards } from "@nestjs/common";
import { Auth, UserDto } from "../common/validators/user.dtos";
import { AuthService } from "../services/auth.service";
import { Serialize } from "../common/interceptors/serialize.interceptor";
import { UserService } from "../services/user.service";
import { CurrentUser } from "../common/decorators/user.decorator";
import { AuthGuard } from "../common/guars/auth.guard";
import { UserSchema } from "../common/schemas/user.entity";


@Serialize(UserDto)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {
  }

  @UseGuards(AuthGuard)
  @Get("/me")
  async authMe(@CurrentUser() user: UserSchema) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  @Post("/register")
  async register(@Body() body: Auth, @Session() session: any) {
    const user = await this.authService.register(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Put("/login")
  async login(@Body() body: Auth, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Delete("/logout")
  async logout(@Session() session: any) {
    session.userId = undefined;
    return "Success"
  }
}
