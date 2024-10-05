import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dtos';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/sequelize';
import { ImageUploadModule } from '../image-upload';
import { UpdateItemDto } from './dtos/update-item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private service: ItemService) {}

  // ------------------------- create item -----------------------------
  @Post('/add')
  @ApiOperation({
    description: 'Add new item',
    summary: 'You can add one item here !',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  async createItem(
    @Body() itemData: CreateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    try {
      await this.service.createOneItem(itemData, image);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // ------------------------- get all items -----------------------------
  @Get('/all')
  @ApiOperation({
    description: 'Get all items',
    summary: 'You can get all items here !',
  })
  async getItems(): Promise<any[]> {
    try {
      return await this.service.getAllItems();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // ------------------------- get one item -------------------------------
  @Get('/one/:id')
  @ApiOperation({
    description: 'Get one item',
    summary: 'You can get one item here !',
  })
  async getItem(@Param('id') id: number): Promise<any> {
    try {
      return await this.service.getOneItem(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // ------------------------- update one item -------------------------------
  @Put('/update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    description: 'Update one item',
    summary: 'You can update one item here !',
  })
  async updateItem(
    @Param('id') id: number,
    @Body() itemData: UpdateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      await this.service.updateOneItem(id, itemData);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // ------------------------- delete one item -------------------------------
  @Delete('/delete/:id')
  @ApiOperation({
    description: 'Delete one item',
    summary: 'You can delete one item here !',
  })
  async deleteItem(@Param('id') id: number): Promise<void> {
    try {
      await this.service.deleteOneItem(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
