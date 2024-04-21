import { Injectable } from '@nestjs/common';
import { CreateItemsInfoDto } from './dto/create-items-info.dto';
import { UpdateItemsInfoDto } from './dto/update-items-info.dto';

@Injectable()
export class ItemsInfoService {
  create(createItemsInfoDto: CreateItemsInfoDto) {
    return 'This action adds a new itemsInfo';
  }

  findAll() {
    return `This action returns all itemsInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemsInfo`;
  }

  update(id: number, updateItemsInfoDto: UpdateItemsInfoDto) {
    return `This action updates a #${id} itemsInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemsInfo`;
  }
}
