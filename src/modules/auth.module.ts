import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../schema/user.entity";
import { UserService } from "../services/user.service";
import { UserInterceptor } from "../interceptors/auth.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserInterceptor]
})
export class AuthModule {
}
