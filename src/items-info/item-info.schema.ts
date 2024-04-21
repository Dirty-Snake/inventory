import { EntitySchema } from 'typeorm';
import { ItemsInfo } from './entities/items-info.entity';

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
    stamp: {
      type: String,
    },
    factory_number: {
      type: String,
      nullable: true,
    },
    period_use: {
      type: Date,
    },
    cost: {
      type: 'decimal',
      precision: 10,
      scale: 2,
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
});
