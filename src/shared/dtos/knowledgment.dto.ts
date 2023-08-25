import { IsNotEmpty } from 'class-validator';
import { Knowledgment } from 'src/modules/knowledgment/knowledgment.entity';

export default class KnowledgmentDto {
  constructor(knowledgment: Knowledgment) {
    this.name = knowledgment.name;
  }

  @IsNotEmpty({ message: 'O nome do conhecimento não pode ser vazio.' })
  name: string;
}
