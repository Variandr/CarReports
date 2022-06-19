import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./auth.entity";
import { UserService } from "./user.service";
import { UserInterceptor } from "../interceptors/auth.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserInterceptor]
})
export class AuthModule {
}
