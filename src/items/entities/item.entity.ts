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
import { ItemsLocation } from '../../items-locations/entities/item-location.entity';
import { User } from '../../users/entities/user.entity';
import { ItemsInfo } from '../../items-info/entities/items-info.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: false })
  decommissioned: boolean;

  @ApiProperty()
  @Column({ length: 8 })
  sku: string;

  @ApiProperty()
  @ManyToOne(() => ItemsLocation, (location) => location.items)
  location: ItemsLocation;

  @ApiProperty()
  @ManyToOne(() => User, (responsible) => responsible.items)
  responsible: User;

  @ApiProperty()
  @OneToOne(() => ItemsInfo, { cascade: true })
  @JoinColumn()
  info: ItemsInfo;

  @ApiProperty()
  @DeleteDateColumn()
  delete_date: Date;

  @ApiProperty()
  @UpdateDateColumn()
  update_date: Date;

  @ApiProperty()
  @CreateDateColumn()
  create_date: Date;
}
