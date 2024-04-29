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
import { ItemsBrandsService } from './items-brands.service';
import { CreateItemsBrandDto } from './dto/create-items-brand.dto';
import { UpdateItemsBrandDto } from './dto/update-items-brand.dto';
import {
  ApiBody,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ItemsBrand } from './entities/items-brand.entity';
import { PaginationItemsBrandDto } from './dto/pagination-items-brand.dto';
import { FindOneItemsBrandDto } from "./dto/find-one-items-brand.dto";

@ApiTags('items-brands')
@Controller('items-brands')
export class ItemsBrandsController {
  constructor(private readonly itemsBrandService: ItemsBrandsService) {}

  @ApiResponse({ type: ItemsBrand })
  @ApiBody({ type: CreateItemsBrandDto })
  @Post()
  create(@Body() createItemsBrandDto: CreateItemsBrandDto) {
    return this.itemsBrandService.create(createItemsBrandDto);
  }

  @ApiResponse({ type: [ItemsBrand] })
  @Get()
  async findAll(@Query() paginationItemsBrandDto: PaginationItemsBrandDto) {
    const { limit, page } = paginationItemsBrandDto;
    return this.itemsBrandService.findAll(page, limit);
  }

  @ApiResponse({ type: ItemsBrand})
  @Get(':id')
  findOne(@Param() { id }: FindOneItemsBrandDto) {
    return this.itemsBrandService.findOne(id);
  }

  @ApiResponse({ type: ItemsBrand})
  @Patch(':id')
  update(
    @Param() { id }: FindOneItemsBrandDto,
    @Body() updateItemsBrandDto: UpdateItemsBrandDto,
  ) {
    return this.itemsBrandService.update(id, updateItemsBrandDto);
  }

  @ApiResponse({ type: ItemsBrand})
  @Delete(':id')
  remove(@Param() { id }: FindOneItemsBrandDto) {
    return this.itemsBrandService.remove(id);
  }
}
