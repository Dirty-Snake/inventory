import { Module } from '@nestjs/common';
import { ItemsLocationService } from './items-location.service';
import { ItemsLocationController } from './items-location.controller';

@Module({
  controllers: [ItemsLocationController],
  providers: [ItemsLocationService],
})
export class ItemsLocationModule {}
