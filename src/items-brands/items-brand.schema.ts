import { EntitySchema } from 'typeorm';
import { ItemsBrand } from './entities/items-brand.entity';
import { Item } from '../items/entities/item.entity';
import { ItemsInfo } from "../items-info/entities/items-info.entity";

export const ItemsBrandSchema: EntitySchema<ItemsBrand> =
  new EntitySchema<ItemsBrand>({
    name: 'ItemsBrand',
    columns: {
      id: {
        type: 'uuid',
        primary: true,
      },
      name: {
        type: String,
      },
      description: {
        type: String,
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
      itemsInfos: {
        type: 'one-to-many',
        target: ItemsInfo,
      },
    },
  });
