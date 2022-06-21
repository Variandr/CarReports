import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

const date = new Date();

export class ReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1950)
  @Max(date.getFullYear())
  year: number;
}

export class ReportWithUser {
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}

export class ReportQueryDto {
  @IsOptional()
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1950)
  @Max(date.getFullYear())
  year: number;
}
