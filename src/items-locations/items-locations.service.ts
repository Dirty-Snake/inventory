import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemsLocationDto } from './dto/create-items-location.dto';
import { UpdateItemsLocationDto } from './dto/update-items-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsLocation } from './entities/item-location.entity';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

@Injectable()
export class ItemsLocationService {
  constructor(
    @InjectRepository(ItemsLocation)
    private itemLocationRepository: Repository<ItemsLocation>,
  ) {}
  async create(createItemLocationDto: CreateItemsLocationDto) {
    const { name } = createItemLocationDto;
    await this.existLocation(name);
    try {
      const location = new ItemsLocation();
      location.name = createItemLocationDto.name;
      return await this.itemLocationRepository.save(location);
    } catch (e) {
      console.log(e);
      return new BadRequestException('Ошибка добавления');
    }
  }

  async findAll(page = 1, limit = 10) {
    const [result, total] = await this.itemLocationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        name: 'ASC',
      },
    });
    return { result, total };
  }
  async existLocation(name: string, excludeId?: string) {
    const where: FindOptionsWhere<ItemsLocation> = {
      name: name,
    };
    if (excludeId) {
      where.id = Not(excludeId);
    }
    const result = await this.itemLocationRepository.existsBy(where);
    if (result) {
      throw new BadRequestException('Такая запись уже существует');
    }
    return result;
  }
  async findOne(id: string): Promise<ItemsLocation> {
    const result = await this.itemLocationRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      throw new BadRequestException('Такой записи не существует');
    }
    return result;
  }

  async update(
    id: string,
    updateItemLocationDto: UpdateItemsLocationDto,
  ): Promise<ItemsLocation> {
    const itemsLocation = await this.findOne(id);
    await this.existLocation(updateItemLocationDto?.name, id);
    Object.assign(itemsLocation, updateItemLocationDto);
    return await this.itemLocationRepository.save(itemsLocation);
  }

  async remove(id: string): Promise<ItemsLocation> {
    const itemsLocation = await this.findOne(id);
    return await this.itemLocationRepository.softRemove(itemsLocation);
  }
}
