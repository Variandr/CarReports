import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportSchema } from '../common/schemas/reports.entity';
import { ReportDto, ReportQueryDto } from '../common/validators/reports.dtos';
import { UserSchema } from '../common/schemas/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportSchema) private repo: Repository<ReportSchema>,
  ) {}

  async addReport(reportDto: ReportDto, user: UserSchema) {
    const report = await this.repo.create(reportDto);
    report.user = user;
    return await this.repo.save(report);
  }

  async approveReport(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report with this id was not found');
    }
    report.approved = approved;
    return await this.repo.save(report);
  }

  async getQueryReports({ make, model, year, price }: ReportQueryDto) {
    const query = await this.repo.createQueryBuilder();
    if (make) {
      query.where('make = :make', { make });
    }
    if (model) {
      query.where('model = :model', { model });
    }
    if (year) {
      query.where('year = :year', { year });
    }
    if (price) {
      query.where('price = :price', { price });
    }
    const reports = query.getMany();
    if (!reports) {
      throw new NotFoundException('Reports by this params were not found');
    }
    return reports;
  }
}
