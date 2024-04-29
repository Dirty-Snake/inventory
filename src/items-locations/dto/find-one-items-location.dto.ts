import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneItemsLocationDto {
  @ApiProperty({
    type: String,
    example: '6ac71bc3-de3f-434e-909d-15b5b44c3e7e',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
