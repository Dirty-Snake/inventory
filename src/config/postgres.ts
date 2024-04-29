import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';
import { ItemsLocation } from '../items-locations/entities/item-location.entity';
import { ItemsInfo } from '../items-info/entities/items-info.entity';
import { ItemsBrand } from '../items-brands/entities/items-brand.entity';
import { ResponsibleHistory } from '../responsible-histories/entities/responsible-history.entity';

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    logging: true,
    logger: 'file',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    //migrationsRun: true,
    entities: [
      User,
      Item,
      ItemsLocation,
      ItemsInfo,
      ItemsBrand,
      ResponsibleHistory,
    ],
    synchronize: true,
  }),
);
