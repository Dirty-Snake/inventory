import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsInfoService } from './items-info.service';
import { CreateItemsInfoDto } from './dto/create-items-info.dto';
import { UpdateItemsInfoDto } from './dto/update-items-info.dto';

@Controller('items-info')
export class ItemsInfoController {
  constructor(private readonly itemsInfoService: ItemsInfoService) {}

  @Post()
  create(@Body() createItemsInfoDto: CreateItemsInfoDto) {
    return this.itemsInfoService.create(createItemsInfoDto);
  }

  @Get()
  findAll() {
    return this.itemsInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemsInfoDto: UpdateItemsInfoDto) {
    return this.itemsInfoService.update(+id, updateItemsInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsInfoService.remove(+id);
  }
}
