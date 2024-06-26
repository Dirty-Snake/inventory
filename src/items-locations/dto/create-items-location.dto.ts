import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemsLocationDto {
  @ApiProperty({
    example: 'Основной',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
