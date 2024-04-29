import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemSchema } from './item.schema';
import { ItemsLocationModule } from '../items-locations/items-locations.module';
import { UsersModule } from '../users/users.module';
import { ItemsBrandsModule } from '../items-brands/items-brands.module';
import { ItemsInfoModule } from "../items-info/items-info.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSchema]),
    ItemsLocationModule,
    UsersModule,
    ItemsBrandsModule,
    ItemsInfoModule
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
