import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReportSchema } from "./reports.entity";

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  online: boolean;

  @OneToMany(() => ReportSchema, (report) => report.user)
  reports: ReportSchema[];
}
