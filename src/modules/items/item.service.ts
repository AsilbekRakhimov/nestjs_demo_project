import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemTableModel } from './models';
import { CreateItemInterface, UpdateItemInterface } from './interfaces';
import { ImageUploadModule } from '../image-upload';
import { join } from 'path';
import * as fs from 'fs';
import { where } from 'sequelize';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(ItemTableModel) private itemModel: typeof ItemTableModel,
  ) {}

  // create item
  async createOneItem(
    itemData: CreateItemInterface,
    image: any,
  ): Promise<void> {
    await this.itemModel.create({
      name: itemData.name,
      description: itemData.description,
      count: itemData.count,
      cost: itemData.cost,
      country: itemData.country,
    });
  }

  // get all items
  async getAllItems(): Promise<any[]> {
    return await this.itemModel.findAll();
  }

  // get one item
  async getOneItem(id: number): Promise<any> {
    return await this.itemModel.findOne({
      where: {
        id,
      },
    });
  }

  // update one item
  async updateOneItem(
    id: number,
    itemData: UpdateItemInterface,
  ): Promise<void> {
    await this.itemModel.update(
      {
        name: itemData.name,
        description: itemData.description,
        cost: itemData.cost,
        count: itemData.count,
        country: itemData.country,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  // delete one item
  async deleteOneItem(id: number): Promise<void> {
    await this.itemModel.destroy({
      where: {
        id,
      },
    });
  }
}
