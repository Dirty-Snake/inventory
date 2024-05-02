import { EntitySchema } from 'typeorm';
import { Item } from './entities/item.entity';
import { ItemsLocation } from '../items-locations/entities/item-location.entity';
import { User } from '../users/entities/user.entity';
import { ItemsInfo } from '../items-info/entities/items-info.entity';
import { ResponsibleHistory } from '../responsible-histories/entities/responsible-history.entity';

export const ItemSchema: EntitySchema<Item> = new EntitySchema<Item>({
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
    description: {
      type: String,
    },
    sku: {
      type: String,
      length: 8,
    },
    decommissioned: {
      type: Boolean,
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
      target: ItemsLocation,
    },
    responsible: {
      type: 'many-to-one',
      target: User,
    },
    info: {
      type: 'one-to-one',
      target: ItemsInfo,
    },
    histories: {
      type: 'one-to-many',
      target: ResponsibleHistory,
    },
  },
});
