import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guars/auth.guard";
import { ReportsService } from "../services/reports.service";
import { ReportDto, ReportWithUser } from "../validators/reports.dtos";
import { CurrentUser } from "../decorators/user.decorator";
import { UserSchema } from "../schema/user.entity";
import { Serialize } from "../interceptors/serialize.interceptor";

@UseGuards(AuthGuard)
@Controller("reports")
export class ReportsController {
  constructor(private service: ReportsService) {
  }

  @Get()
  async getReports() {
    return await this.service.getReports();
  }

  @Serialize(ReportWithUser)
  @Post()
  async addReport(@Body() body: ReportDto, @CurrentUser() user: UserSchema) {
    return await this.service.addReport(body, user);
  }

  @Post("/:id")
  async editReport(@Param("id") id: number) {
    return await this.service.editReport(id);
  }
}
