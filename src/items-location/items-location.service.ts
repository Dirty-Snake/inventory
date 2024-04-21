import { Injectable } from '@nestjs/common';
import { CreateItemLocationDto } from './dto/create-item-location.dto';
import { UpdateItemLocationDto } from './dto/update-item-location.dto';

@Injectable()
export class ItemsLocationService {
  create(createItemLocationDto: CreateItemLocationDto) {
    return 'This action adds a new itemLocation';
  }

  findAll() {
    return `This action returns all itemLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemLocation`;
  }

  update(id: number, updateItemLocationDto: UpdateItemLocationDto) {
    return `This action updates a #${id} itemLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemLocation`;
  }
}
