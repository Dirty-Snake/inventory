import { Module } from '@nestjs/common';
import { ItemsLocationService } from './items-locations.service';
import { ItemsLocationController } from './items-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsLocationSchema } from './item-location.schema';
@Module({
  imports: [TypeOrmModule.forFeature([ItemsLocationSchema])],
  controllers: [ItemsLocationController],
  providers: [ItemsLocationService],
  exports: [ItemsLocationService],
})
export class ItemsLocationModule {}
