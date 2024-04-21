import { PartialType } from '@nestjs/mapped-types';
import { CreateItemLocationDto } from './create-item-location.dto';

export class UpdateItemLocationDto extends PartialType(CreateItemLocationDto) {}
