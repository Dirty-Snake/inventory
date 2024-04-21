import { EntitySchema } from 'typeorm';
import { ItemLocation } from './entities/item-location.entity';
import { Item } from '../items/entities/item.entity'; // Путь к сущности ItemLocation

export const ItemLocationSchema = new EntitySchema<ItemLocation>({
  name: 'ItemLocation',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    delete_date: {
      type: Date,
      select: false,
    },
    update_date: {
      type: Date,
    },
    create_date: {
      type: Date,
    },
  },
  relations: {
    items: {
      type: 'one-to-many',
      target: Item, // Название сущности Item
    },
  },
});
