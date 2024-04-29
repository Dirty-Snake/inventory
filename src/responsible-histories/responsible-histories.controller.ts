import { Controller } from '@nestjs/common';
import { ResponsibleHistoriesService } from './responsible-histories.service';

@Controller('responsible-histories')
export class ResponsibleHistoriesController {
  constructor(
    private readonly responsibleHistoriesService: ResponsibleHistoriesService,
  ) {}
}
