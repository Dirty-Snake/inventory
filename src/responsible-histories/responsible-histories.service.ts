import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsibleHistory } from './entities/responsible-history.entity';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ResponsibleHistoriesService {
  constructor(
    @InjectRepository(ResponsibleHistory)
    private historiesRepository: Repository<ResponsibleHistory>,
  ) {}
  create(item: Item, user: User): ResponsibleHistory {
    return this.historiesRepository.create({
      item: item,
      user: user,
    });
  }
  async findAll(itemId: string) {
    return await this.historiesRepository.find({
      take: 5,
      where: {
        item: {
          id: itemId,
        },
      },
      relations: {
        user: true,
      },
      order: {
        create_date: 'DESC',
      },
    });
  }
}
