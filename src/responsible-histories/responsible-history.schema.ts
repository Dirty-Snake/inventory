import { EntitySchema } from 'typeorm';
import { ResponsibleHistory } from './entities/responsible-history.entity';
import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';

export const ResponsibleHistorySchema = new EntitySchema<ResponsibleHistory>({
  name: 'ResponsibleHistory',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
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
    user: {
      type: 'many-to-one',
      target: User,
    },
    item: {
      type: 'many-to-one',
      target: Item,
    },
  },
});
