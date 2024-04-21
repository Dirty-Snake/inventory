import { EntitySchema } from 'typeorm';
import { Item } from './entities/item.entity';
import { ItemLocation } from '../items-location/entities/item-location.entity';

export const ItemSchema = new EntitySchema<Item>({
  name: 'Item',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    sku: {
      type: String,
      length: 8,
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
    location: {
      type: 'many-to-one',
      target: ItemLocation,
    },
  },
});
