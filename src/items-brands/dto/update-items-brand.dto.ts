import { PartialType } from '@nestjs/swagger';
import { CreateItemsBrandDto } from './create-items-brand.dto';

export class UpdateItemsBrandDto extends PartialType(CreateItemsBrandDto) {}
