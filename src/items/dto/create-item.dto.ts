import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  location_id: string;

  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  responsible_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(8)
  @MinLength(8)
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  brand_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  factory_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  period_use: number;

  @IsDecimal({ decimal_digits: '10' })
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_commissioning: Date;

  @ApiProperty({ default: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  decommissioned?: boolean;
}
