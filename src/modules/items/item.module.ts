import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemTableModel } from './models';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ImageUploadModule } from '../image-upload';

@Module({
  imports: [SequelizeModule.forFeature([ItemTableModel]), ImageUploadModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
