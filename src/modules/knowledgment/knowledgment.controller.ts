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

@Controller('knowledgments')
export class KnowledgmentController {
  constructor(private readonly knowledgmentService: KnowledgmentService) {}

  @Get('/')
  async getKnowledgments() {
    const knowledgments = await this.knowledgmentService.getKnowledgments();
    return knowledgments;
  }

  @Post('/create')
  async createKnowledgment(@Body() knowledgmentData: KnowledgmentDto) {
    try {
      await this.knowledgmentService.createKnowledgment(knowledgmentData);
      return {
        status: HttpStatus.OK,
        message: 'Knowledgment created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
