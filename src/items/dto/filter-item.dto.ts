import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterItemDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '867ec37a-7681-4da5-bb65-eb4fe0794dda',
    description: 'Фильтр по местонахождению',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  location_id: string;
}
