import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemLocation } from '../../items-location/entities/item-location.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ItemLocation, (location) => location.items)
  location: ItemLocation;

  @ManyToOne(() => User, (responsible) => responsible.items)
  responsible: User;

  @Column({ length: 8 })
  sku: string;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @CreateDateColumn()
  create_date: Date;
}
