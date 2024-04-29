import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationItemsLocationDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;
}
