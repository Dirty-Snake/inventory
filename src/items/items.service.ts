import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemsLocationService } from '../items-locations/items-locations.service';
import { UsersService } from '../users/users.service';
import { ItemsLocation } from '../items-locations/entities/item-location.entity';
import { User } from '../users/entities/user.entity';
import { ItemsInfo } from '../items-info/entities/items-info.entity';
import { ItemsBrandsService } from '../items-brands/items-brands.service';
import { ItemsBrand } from '../items-brands/entities/items-brand.entity';
import { ItemsInfoService } from '../items-info/items-info.service';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private itemsLocationService: ItemsLocationService,
    private usersService: UsersService,
    private itemsBrandsService: ItemsBrandsService,
    private itemsInfoService: ItemsInfoService,
  ) {}
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const {
      location_id,
      responsible_id,
      brand_id,
      name,
      sku,
      decommissioned,
      ...itemsInfo
    } = createItemDto;
    const item = new Item();
    const brand: ItemsBrand = await this.itemsBrandsService.findOne(brand_id);
    const { cost, period_use } = itemsInfo;
    const depreciation =
      cost >= 40000 ? Number((cost / period_use).toFixed(2)) : null;
    const info = this.itemsInfoService.create({
      ...itemsInfo,
      depreciation,
      brand,
    });
    Object.assign(item, { name, decommissioned, sku, info });
    item.location = await this.itemsLocationService.findOne(location_id);
    item.responsible = await this.usersService.findOne(responsible_id);
    return await this.itemsRepository.save(item);
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ result: Item[]; total: number }> {
    const [result, total] = await this.itemsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { result, total };
  }

  async findOne(id: string) {
    const result = await this.itemsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        responsible: true,
        info: {
          brand: true,
        },
        location: true,
      },
    });
    if (!result) {
      throw new BadRequestException('Такого предмета не существует');
    }
    return result;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const {
      location_id,
      responsible_id,
      brand_id,
      name,
      sku,
      decommissioned,
      ...itemsInfo
    } = updateItemDto;
    const item = await this.findOne(id);
    Object.assign(item, { name, decommissioned, sku });
    if (brand_id) {
      const brand: ItemsBrand = await this.itemsBrandsService.findOne(brand_id);
      Object.assign(item.info, brand, itemsInfo);
    }
    if (location_id) {
      item.location = await this.itemsLocationService.findOne(location_id);
    }
    if (responsible_id) {
      item.responsible = await this.usersService.findOne(responsible_id);
    }
    return await this.itemsRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.itemsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        info: true,
      },
    });
    return await this.itemsRepository.softRemove(item);
  }
}
