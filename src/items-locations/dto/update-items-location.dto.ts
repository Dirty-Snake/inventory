import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsLocationDto } from './create-items-location.dto';

export class UpdateItemsLocationDto extends PartialType(
  CreateItemsLocationDto,
) {}
