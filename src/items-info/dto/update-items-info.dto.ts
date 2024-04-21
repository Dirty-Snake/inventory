import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsInfoDto } from './create-items-info.dto';

export class UpdateItemsInfoDto extends PartialType(CreateItemsInfoDto) {}
