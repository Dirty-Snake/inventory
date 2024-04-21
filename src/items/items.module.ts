import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemSchema } from './item.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ItemSchema])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
