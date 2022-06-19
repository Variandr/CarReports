import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { AuthModule } from "./auth.module";
import { ReportsModule } from "./reports.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../common/schemas/user.entity";
import { ReportSchema } from "../common/schemas/reports.entity";
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";

const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.development`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          url: config.get<string>("DB_URL"),
          entities: [UserSchema, ReportSchema],
          synchronize: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false
            }
          }
        };
      }
    }),
    AuthModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({ whitelist: true })
  }]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ["cookie-crypto"] })).forRoutes("*");
  }
}
