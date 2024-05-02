import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { ItemsLocationService } from '../items-locations/items-locations.service';
import { UsersService } from '../users/users.service';
import { ItemsBrandsService } from '../items-brands/items-brands.service';
import { ItemsBrand } from '../items-brands/entities/items-brand.entity';
import { ItemsInfoService } from '../items-info/items-info.service';
import { ResponsibleHistoriesService } from '../responsible-histories/responsible-histories.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
    private itemsLocationService: ItemsLocationService,
    private usersService: UsersService,
    private itemsBrandsService: ItemsBrandsService,
    private itemsInfoService: ItemsInfoService,
    private responsibleHistoriesService: ResponsibleHistoriesService,
  ) {}
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const {
      location_id,
      responsible_id,
      brand_id,
      name,
      description,
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
    Object.assign(item, { name, decommissioned, sku, info, description });
    item.location = await this.itemsLocationService.findOne(location_id);
    item.responsible = await this.usersService.findOne(responsible_id);
    try {
      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(item);
          const history = this.responsibleHistoriesService.create(
            item,
            item.responsible,
          );
          await transactionalEntityManager.save(history);
        },
      );
      return item;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Ошибка создания');
    }

    //return await this.itemsRepository.save(item);
  }

  async findAll(
    page = 1,
    limit = 10,
    locationId?: string,
  ): Promise<{ result: Item[]; total: number }> {
    const [result, total] = await this.itemsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        location: {
          id: locationId,
        },
      },
      relations: {
        location: true,
      },
      order: {
        decommissioned: 'ASC',
        create_date: 'ASC',
      },
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
    result.histories = await this.responsibleHistoriesService.findAll(
      result.id,
    );
    return result;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const {
      location_id,
      responsible_id,
      brand_id,
      name,
      sku,
      description,
      decommissioned,
      ...itemsInfo
    } = updateItemDto;
    const item = await this.findOne(id);
    Object.assign(item, { name, decommissioned, sku, description });
    if (brand_id) {
      item.info.brand = await this.itemsBrandsService.findOne(brand_id);
    }
    Object.assign(item.info, itemsInfo);
    const { cost, period_use } = item.info;
    item.info.depreciation =
      cost >= 40000 ? Number((cost / period_use).toFixed(2)) : null;
    if (location_id) {
      item.location = await this.itemsLocationService.findOne(location_id);
    }
    const previousResponsible = item.responsible;
    if (responsible_id) {
      item.responsible = await this.usersService.findOne(responsible_id);
    }
    try {
      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(item);
          if (responsible_id && previousResponsible.id !== responsible_id) {
            const history = this.responsibleHistoriesService.create(
              item,
              item.responsible,
            );
            await transactionalEntityManager.save(history);
          }
        },
      );
      return item;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Ошибка создания');
    }
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
