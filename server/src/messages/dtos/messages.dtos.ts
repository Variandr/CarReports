import { IsNotEmpty, Length } from 'class-validator';

export class AddMessageDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @Length(1, 100)
  message: string;
}
