import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemsLocationService } from './items-locations.service';
import { CreateItemsLocationDto } from './dto/create-items-location.dto';
import { UpdateItemsLocationDto } from './dto/update-items-location.dto';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ItemsLocation } from './entities/item-location.entity';
import { FindOneItemsLocationDto } from './dto/find-one-items-location.dto';
import { PaginationItemsLocationDto } from './dto/pagination-items-location.dto';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@ApiHeader({
  name: 'Authorization',
  description: 'Access токен',
})
@ApiTags('items-locations')
@Controller('items-locations')
export class ItemsLocationController {
  constructor(private readonly itemLocationService: ItemsLocationService) {}

  @ApiResponse({
    type: ItemsLocation,
  })
  @ApiBody({
    type: CreateItemsLocationDto,
  })
  @Post()
  async create(@Body() createItemLocationDto: CreateItemsLocationDto) {
    return await this.itemLocationService.create(createItemLocationDto);
  }

  @ApiResponse({
    type: [ItemsLocation],
  })
  @Get()
  async findAll(
    @Query() paginationItemsLocationDto: PaginationItemsLocationDto,
  ) {
    const { page, limit } = paginationItemsLocationDto;
    return await this.itemLocationService.findAll(page, limit);
  }
  @ApiResponse({
    type: ItemsLocation,
  })
  @Get(':id')
  findOne(@Param() { id }: FindOneItemsLocationDto) {
    return this.itemLocationService.findOne(id);
  }

  @ApiResponse({
    type: ItemsLocation,
  })
  @Patch(':id')
  async update(
    @Param() { id }: FindOneItemsLocationDto,
    @Body() updateItemLocationDto: UpdateItemsLocationDto,
  ): Promise<ItemsLocation> {
    return await this.itemLocationService.update(id, updateItemLocationDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneItemsLocationDto) {
    return this.itemLocationService.remove(id);
  }
}
