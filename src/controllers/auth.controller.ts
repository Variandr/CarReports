import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Session,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Auth, Update, UserDtos } from "../validators/user.dtos";
import { AuthService } from "../services/auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserService } from "../services/user.service";
import { UserInterceptor } from "../interceptors/auth.interceptor";
import { CurrentUser } from "../decorators/user.decorator";
import { AuthGuard } from "../guars/auth.guard";


@Serialize(UserDtos)
@Controller("auth")
@UseInterceptors(UserInterceptor)
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {
  }

  @UseGuards(AuthGuard)
  @Get("/me")
  async authMe(@CurrentUser() user: UserDtos) {
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

  @Patch("/update")
  async updatePassword(@Body() body: Update) {
    return this.authService.updatePassword(body.id, body);
  }

  @Delete("/logout/:id")
  async logout(@Param("id") id: number, @Session() session: any) {
    session.userId = undefined;
    return this.authService.logout(id);
  }

  @Delete("/delete/:id")
  async deleteUser(@Param("id") id: number) {
    return this.authService.deleteUser(id);
  }
}