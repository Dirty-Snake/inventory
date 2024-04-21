import { Module } from '@nestjs/common';
import { ItemsInfoService } from './items-info.service';
import { ItemsInfoController } from './items-info.controller';

@Module({
  controllers: [ItemsInfoController],
  providers: [ItemsInfoService],
})
export class ItemsInfoModule {}
