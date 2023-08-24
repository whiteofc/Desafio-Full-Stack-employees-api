import { IsNotEmpty, IsString } from 'class-validator';

export default class KnowledgmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
