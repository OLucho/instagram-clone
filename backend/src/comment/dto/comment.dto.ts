import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MinLength(5)
  body: string;
}
