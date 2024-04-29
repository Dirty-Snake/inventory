import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { PaginationItemDto } from './dto/pagination-item.dto';
import { FindOneItemsDto } from "./dto/find-one-items.dto";
@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiResponse({ type: Item })
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @ApiResponse({ type: [Item] })
  @Get()
  async findAll(@Query() paginationItemDto: PaginationItemDto) {
    const { page, limit } = paginationItemDto;
    return await this.itemsService.findAll(page, limit);
  }

  @ApiResponse({ type: Item })
  @Get(':id')
  async findOne(@Param() { id }: FindOneItemsDto): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @ApiResponse({ type: Item })
  @Patch(':id')
  update(@Param() { id }: FindOneItemsDto, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @ApiResponse({ type: Item })
  @Delete(':id')
  remove(@Param() { id }: FindOneItemsDto) {
    return this.itemsService.remove(id);
  }
}
