import { IsEmail, IsNumber, Length } from "class-validator";
import { Expose } from "class-transformer";

export class Auth {
  @IsEmail()
  email: string;

  @Length(8, 100)
  password: string;
}

export class Update {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @Length(8, 100)
  password: string;
}

export class UserDtos {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
