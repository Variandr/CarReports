import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ReportsModule } from "./reports/reports.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./auth/auth.entity";
import { Report } from "./reports/reports.entity";

@Module({
  imports: [AuthModule, ReportsModule, TypeOrmModule.forRoot({
    type: "postgres",
    url: "postgres://klobjvmzsqvzgx:bd9b805dc8b632ee5f5dd0228c2c9011ddbce256110d2ce44d520768f666b9ec@ec2-54-228-32-29.eu-west-1.compute.amazonaws.com:5432/derl5r9lp6l09p",
    entities: [Auth, Report],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
