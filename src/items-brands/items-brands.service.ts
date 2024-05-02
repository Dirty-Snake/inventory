import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemsBrandDto } from './dto/create-items-brand.dto';
import { UpdateItemsBrandDto } from './dto/update-items-brand.dto';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import { ItemsBrand } from './entities/items-brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsBrandsService {
  constructor(
    @InjectRepository(ItemsBrand)
    private brandRepository: Repository<ItemsBrand>,
  ) {}
  async create(createItemsBrandDto: CreateItemsBrandDto): Promise<ItemsBrand> {
    const { name, description } = createItemsBrandDto;
    const brand: ItemsBrand = new ItemsBrand();
    await this.existsBrand(name);
    Object.assign(brand, { name, description });
    return await this.brandRepository.save(brand);
  }

  async existsBrand(name: string, notIncludeId?: string) {
    const where: FindOptionsWhere<ItemsBrand> = { name: name };
    if (notIncludeId) {
      Object.assign(where, { id: Not(notIncludeId) });
    }
    const result = await this.brandRepository.existsBy(where);
    if (result) {
      throw new BadRequestException('Такое имя уже существует');
    }
  }
  async findAll(page = 1, limit = 10) {
    const [result, total] = await this.brandRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        name: 'ASC',
      },
    });
    return { result, total };
  }

  async findOne(id: string): Promise<ItemsBrand> {
    const result = await this.brandRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      throw new BadRequestException('Такого брэнда не существует');
    }
    return result;
  }

  async update(
    id: string,
    updateItemsBrandDto: UpdateItemsBrandDto,
  ): Promise<ItemsBrand> {
    const brand = await this.findOne(id);
    if (updateItemsBrandDto.name) {
      await this.existsBrand(updateItemsBrandDto.name, id);
    }
    Object.assign(brand, updateItemsBrandDto);
    return await this.brandRepository.save(brand);
  }

  async remove(id: string): Promise<ItemsBrand> {
    const brand = await this.findOne(id);
    return await this.brandRepository.softRemove(brand);
  }
}
