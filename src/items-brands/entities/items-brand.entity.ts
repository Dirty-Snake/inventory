import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ItemsInfo } from '../../items-info/entities/items-info.entity';

@Entity()
export class ItemsBrand {
  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'DELL',
    description: 'Название',
  })
  @Column()
  name: string;

  @ApiProperty({
    required: false,
    example: 'Какое-то описание',
    description: 'Описание',
  })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ItemsInfo, (info) => info.brand)
  itemsInfos: ItemsInfo[];

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
