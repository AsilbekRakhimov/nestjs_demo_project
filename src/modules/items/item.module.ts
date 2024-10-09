import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemTableModel } from './models';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ImageUploadModule, ImageUploadService } from '../file-upload';

@Module({
  imports: [SequelizeModule.forFeature([ItemTableModel])],
  controllers: [ItemController],
  providers: [ItemService, ImageUploadService],
})
export class ItemModule {}
