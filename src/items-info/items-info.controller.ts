import { Controller } from '@nestjs/common';
import { ItemsInfoService } from './items-info.service';

@Controller(`items-info`)
export class ItemsInfoController {
  constructor(private readonly itemsInfoService: ItemsInfoService) {}
}
