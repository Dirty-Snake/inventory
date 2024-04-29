import { Module } from '@nestjs/common';
import { ItemsInfoService } from './items-info.service';
import { ItemsInfoController } from './items-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsInfoSchema } from './item-info.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsInfoSchema])],
  controllers: [ItemsInfoController],
  providers: [ItemsInfoService],
  exports: [ItemsInfoService],
})
export class ItemsInfoModule {}
