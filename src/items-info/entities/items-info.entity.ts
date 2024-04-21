import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ItemsInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  stamp: string;

  @Column({ nullable: true })
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
