import { PartialType } from '@nestjs/swagger';
import { CreateResponsibleHistoryDto } from './create-responsible-history.dto';

export class UpdateResponsibleHistoryDto extends PartialType(CreateResponsibleHistoryDto) {}
