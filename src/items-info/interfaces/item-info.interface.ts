import { ItemsBrand } from '../../items-brands/entities/items-brand.entity';

export interface ItemInfoInterface {
  model: string;
  factory_number: string;
  period_use: number;
  cost: number;
  date_commissioning: Date;
  brand: ItemsBrand;
  depreciation: number | null;
}
