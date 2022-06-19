import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReportSchema } from "../schema/reports.entity";
import { ReportDto } from "../validators/reports.dtos";
import { UserSchema } from "../schema/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(ReportSchema) private repo: Repository<ReportSchema>) {
  }

  async getReports() {
    return await this.repo.find();
  }

  async addReport(reportDto: ReportDto, user: UserSchema) {
    const report = await this.repo.create(reportDto);
    report.user = user;
    return await this.repo.save(report);
  }

  async editReport(id: number) {
    return await this.repo.findOneBy({ id });
  }
}
