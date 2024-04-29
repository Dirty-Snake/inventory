import { Module } from '@nestjs/common';
import { ItemsBrandsService } from './items-brands.service';
import { ItemsBrandsController } from './items-brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsBrandSchema } from './items-brand.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsBrandSchema])],
  controllers: [ItemsBrandsController],
  providers: [ItemsBrandsService],
  exports: [ItemsBrandsService],
})
export class ItemsBrandsModule {}
