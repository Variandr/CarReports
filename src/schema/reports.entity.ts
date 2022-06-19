import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSchema } from "./user.entity";

@Entity()
export class ReportSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  price: number;

  @Column()
  year: number;

  @ManyToOne(() => UserSchema, (user) => user.reports)
  user: UserSchema;
}
