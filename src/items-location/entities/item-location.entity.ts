import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
@Entity()
export class ItemLocation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.location)
  items: Item[];

  @DeleteDateColumn({ select: false })
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @CreateDateColumn()
  create_date: Date;
}
