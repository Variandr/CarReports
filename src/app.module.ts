import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ReportsModule } from "./reports/reports.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./auth/auth.entity";
import { Report } from "./reports/reports.entity";
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";

const cookieSession = require("cookie-session");

@Module({
  imports: [
    AuthModule,
    ReportsModule,
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
          entities: [Auth, Report],
          synchronize: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false
            }
          }
        };
      }
    })
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
