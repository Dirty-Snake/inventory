import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemsLocation } from '../../items-locations/entities/item-location.entity';
import { User } from '../../users/entities/user.entity';
import { ItemsInfo } from '../../items-info/entities/items-info.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResponsibleHistory } from '../../responsible-histories/entities/responsible-history.entity';

@Entity()
export class Item {
  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'Принтер DELL',
    description: 'Название',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Принтер DELL',
    description: 'Название',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Списание предмета',
    default: false,
  })
  @Column({ default: false })
  decommissioned: boolean;

  @ApiProperty({
    type: String,
    example: '122EE223',
    description: 'Артикул (8 символов)',
  })
  @Column({ length: 8 })
  sku: string;

  @ApiProperty({
    type: () => ItemsLocation,
    description: 'Местонахождние',
  })
  @ManyToOne(() => ItemsLocation, (location) => location.items)
  location: ItemsLocation;

  @ApiProperty({
    type: () => User,
    description: 'Материально ответственный',
  })
  @ManyToOne(() => User, (responsible) => responsible.items)
  responsible: User;

  @ApiProperty({
    type: () => ItemsInfo,
    description: 'Подробная информация(должна отображаться в попапе)',
  })
  @OneToOne(() => ItemsInfo, { cascade: true })
  @JoinColumn()
  info: ItemsInfo;

  @ApiProperty({
    type: () => [ResponsibleHistory],
    description: 'История отвественных',
  })
  @OneToMany(() => ResponsibleHistory, (histories) => histories.item)
  histories: ResponsibleHistory[];

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
