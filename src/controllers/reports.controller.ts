import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guars/auth.guard';
import { ReportsService } from '../services/reports.service';
import {
  ApproveReportDto,
  ReportDto,
  ReportQueryDto,
  ReportWithUser,
} from '../common/validators/reports.dtos';
import { CurrentUser } from '../common/decorators/user.decorator';
import { UserSchema } from '../common/schemas/user.entity';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { AdminGuard } from '../common/guars/admin.guard';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get()
  async getReportsByQuery(@Query() query: ReportQueryDto) {
    return this.service.getQueryReports(query);
  }

  @Post()
  @Serialize(ReportWithUser)
  async addReport(@Body() body: ReportDto, @CurrentUser() user: UserSchema) {
    return await this.service.addReport(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return await this.service.approveReport(id, body.approved);
  }
}
