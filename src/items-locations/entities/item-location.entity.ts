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
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class ItemsLocation {
  @ApiProperty({
    type: 'uuid',
    example: '6ac71bc3-de3f-434e-909d-15b5b44c3e7e',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'Основной',
    description: 'Название локации',
  })
  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.location)
  items: Item[];

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
