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
import { ItemsInfo } from "../../items-info/entities/items-info.entity";

@Entity()
export class ItemsBrand {
  @ApiProperty({ example: 'cd312e8d-0fa4-43ae-83bf-eb794ea8ce36' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Dell' })
  @Column()
  name: string;

  @ApiProperty({ required: false, example: 'Какое-то описание' })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ItemsInfo, (info) => info.brand)
  itemsInfos: ItemsInfo[];

  @DeleteDateColumn({ select: false })
  delete_date: Date;

  @ApiProperty()
  @UpdateDateColumn()
  update_date: Date;

  @ApiProperty()
  @CreateDateColumn()
  create_date: Date;
}
