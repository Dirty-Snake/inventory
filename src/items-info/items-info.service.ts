import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsInfo } from './entities/items-info.entity';
import { Repository } from 'typeorm';
import { ItemInfoInterface } from './interfaces/item-info.interface';

@Injectable()
export class ItemsInfoService {
  constructor(
    @InjectRepository(ItemsInfo)
    private infoRepository: Repository<ItemsInfo>,
  ) {}
  create(itemsInfoData: ItemInfoInterface) {
    return this.infoRepository.create(itemsInfoData);
  }
  async findOne(itemId) {
    return await this.infoRepository.findOne({
      relations: {
        brand: true,
      },
      where:{

      }
    });
  }
}
