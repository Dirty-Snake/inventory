import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemsBrand } from '../../items-brands/entities/items-brand.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ItemsInfo {
  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'XPS 144',
    type: String,
    description: 'Модель',
  })
  @Column()
  model: string;

  @ApiProperty({
    type: () => ItemsBrand,
    description: 'Брэнд',
  })
  @ManyToOne(() => ItemsBrand, (brand) => brand.itemsInfos)
  brand: ItemsBrand;

  @ApiProperty({
    example: '13EEEE1232GSSR32',
    type: String,
    description: 'Заводской номер',
    required: false,
  })
  @Column({ nullable: true, length: 100 })
  factory_number: string;

  @ApiProperty({
    example: '60',
    type: Number,
    description: 'Срок полезного использования (в месяцах)',
  })
  @Column()
  period_use: number;

  @ApiProperty({
    example: '60000.00',
    type: Number,
    description: 'Сумма',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @ApiProperty({
    type: Date,
    description: 'Дата списания',
  })
  @Column()
  date_commissioning: Date;

  @ApiProperty({
    type: String,
    example: '667.00',
    description: 'Амортизация руб/мес',
  })
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  depreciation?: number;

  @DeleteDateColumn({ select: false })
  delete_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата обновления',
  })
  @UpdateDateColumn()
  update_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата создания',
  })
  @CreateDateColumn()
  create_date: Date;
}
