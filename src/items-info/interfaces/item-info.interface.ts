import { ItemsBrand } from "../../items-brands/entities/items-brand.entity";

export interface ItemInfoInterface {
  model: string;
  factory_number: string;
  period_use: string;
  cost: number;
  date_commissioning: Date;
  brand: ItemsBrand,
}
