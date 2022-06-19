import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReportSchema } from "../common/schemas/reports.entity";
import { ReportDto } from "../common/validators/reports.dtos";
import { UserSchema } from "../common/schemas/user.entity";

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

  async approveReport(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException("Report with this id was not found");
    }
    report.approved = approved;
    return await this.repo.save(report);
  }
}
