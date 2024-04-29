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
import { ResponsibleHistory } from '../../responsible-histories/entities/responsible-history.entity';

@Entity()
export class User {
  @ApiProperty({
    example: '766be24d-6f78-4d8a-b838-74d066d39429',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'admin',
    type: String,
    description: 'Логин',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: 'test@email.ru',
    type: String,
    description: 'Эл. почта',
  })
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({
    type: String,
    example: 'Иванов',
    description: 'Фамилия',
    required: false,
  })
  @Column({ nullable: true })
  lastname: string;

  @ApiProperty({
    type: String,
    example: 'Максим',
    description: 'Имя',
    required: false,
  })
  @Column({ nullable: true })
  firstname: string;

  @OneToMany(() => Item, (item) => item.responsible)
  items: Item[];

  @OneToMany(() => ResponsibleHistory, (histories) => histories.user)
  histories: ResponsibleHistory[];

  @DeleteDateColumn()
  deleteDate: Date;

  @ApiProperty({
    description: 'Дата обновления',
    type: Date,
  })
  @UpdateDateColumn()
  updateDate: Date;

  @ApiProperty({
    description: 'Дата создания',
    type: Date,
  })
  @CreateDateColumn()
  createDate: Date;
}
