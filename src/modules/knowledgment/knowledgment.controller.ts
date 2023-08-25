import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { KnowledgmentService } from '../../services/knowledgment.service';
import KnowledgmentDto from 'src/shared/dtos/knowledgment.dto';
import { validate } from 'class-validator';
import { Knowledgment } from './knowledgment.entity';

@Controller('knowledgments')
export class KnowledgmentController {
  constructor(private readonly knowledgmentService: KnowledgmentService) {}

  @Get('/')
  async getKnowledgments() {
    const knowledgments = await this.knowledgmentService.getKnowledgments();
    return knowledgments;
  }

  @Post('/create')
  async createKnowledgment(@Body() knowledgmentData: Knowledgment) {
    try {
      const knowledgment = new KnowledgmentDto(knowledgmentData);

      return await validate(knowledgment).then(async (errors) => {
        if (errors.length > 0) {
          throw {
            message: errors.map((error) => error.constraints),
          };
        }
        await this.knowledgmentService.createKnowledgment(knowledgmentData);
        return {
          status: HttpStatus.OK,
          message: 'Knowledgment created successfully',
        };
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
