import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

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
  @IsString()
  period_use: string;

  @IsDecimal({ decimal_digits: '10' })
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_commissioning: Date;

  @ApiProperty({ default: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  decommissioned?: boolean;
}
