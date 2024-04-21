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
export class User {
  @ApiProperty({
    example: '766be24d-6f78-4d8a-b838-74d066d39429',
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'admin',
    type: String,
  })
  @Column()
  username: string;

  @ApiProperty({
    example: 'test@email.ru',
    type: String,
  })
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: 'Дата создания',
    type: () => [Item],
  })
  @OneToMany(() => Item, (item) => item.responsible)
  items: Item[];

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
