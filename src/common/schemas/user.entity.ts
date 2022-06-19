import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReportSchema } from "./reports.entity";

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  password: string;

  @OneToMany(() => ReportSchema, (report) => report.user)
  reports: ReportSchema[];
}
