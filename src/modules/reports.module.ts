import { Module } from '@nestjs/common';
import { ReportsController } from '../controllers/reports.controller';
import { ReportsService } from '../services/reports.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportSchema } from "../common/schemas/reports.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReportSchema])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
