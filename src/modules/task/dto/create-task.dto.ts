import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Название или заголовок задачи',
    example: 'Подготовить отчет за квартал',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  TITLE?: string;

  @ApiProperty({
    description: 'Детальное описание задачи',
    example: 'Необходимо собрать данные из CRM, проанализировать продажи и оформить в презентацию.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  TEXT?: string;

  @ApiProperty({
    description: 'Дата и время начала задачи',
    example: '2026-06-25T10:00:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  DATE_START?: string;

  @ApiProperty({
    description: 'Дата и время окончания задачи',
    example: '2026-06-30T18:00:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  DATE_END?: string;
}