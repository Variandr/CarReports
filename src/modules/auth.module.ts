import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../common/schemas/user.entity";
import { UserService } from "../services/user.service";
import { UserMiddleware } from "../common/middlewares/user.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes("*");
  }
}
