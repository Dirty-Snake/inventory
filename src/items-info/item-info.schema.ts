import { EntitySchema } from 'typeorm';
import { ItemsInfo } from './entities/items-info.entity';
import { Item } from '../items/entities/item.entity';
import { ItemsBrand } from '../items-brands/entities/items-brand.entity';

export const ItemsInfoSchema = new EntitySchema<ItemsInfo>({
  name: 'ItemsInfo',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    model: {
      type: String,
    },
    factory_number: {
      type: String,
      nullable: true,
    },
    period_use: {
      type: Number,
    },
    cost: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    depreciation: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: true
    },
    date_commissioning: {
      type: Date,
    },
    delete_date: {
      type: Date,
    },
    update_date: {
      type: Date,
    },
    create_date: {
      type: Date,
    },
  },
  relations: {
    brand: {
      type: 'many-to-one',
      target: ItemsBrand,
    },
  },
});
