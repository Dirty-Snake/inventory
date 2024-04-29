import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { ItemsBrand } from '../../items-brands/entities/items-brand.entity';

@Entity()
export class ItemsInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @ManyToOne(() => ItemsBrand, (brand) => brand.itemsInfos)
  brand: ItemsBrand;

  @Column({ nullable: true, length: 100 })
  factory_number: string;

  @Column()
  period_use: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column()
  date_commissioning: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @CreateDateColumn()
  create_date: Date;
}
