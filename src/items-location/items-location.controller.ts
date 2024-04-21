import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsLocationService } from './items-location.service';
import { CreateItemLocationDto } from './dto/create-item-location.dto';
import { UpdateItemLocationDto } from './dto/update-item-location.dto';

@Controller('items-location')
export class ItemsLocationController {
  constructor(private readonly itemLocationService: ItemsLocationService) {}

  @Post()
  create(@Body() createItemLocationDto: CreateItemLocationDto) {
    return this.itemLocationService.create(createItemLocationDto);
  }

  @Get()
  findAll() {
    return this.itemLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemLocationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemLocationDto: UpdateItemLocationDto,
  ) {
    return this.itemLocationService.update(+id, updateItemLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemLocationService.remove(+id);
  }
}
