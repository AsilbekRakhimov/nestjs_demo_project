import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemTableModel } from './models';
import { CreateItemInterface, UpdateItemInterface } from './interfaces';
import { ImageUploadService } from '../file-upload';

@Injectable()
export class ItemService {
  #_uploadModel: ImageUploadService;
  constructor(
    @InjectModel(ItemTableModel) private itemModel: typeof ItemTableModel,
    upload: ImageUploadService,
  ) {
    this.#_uploadModel = upload;
  }

  // create item
  async createOneItem(
    itemData: CreateItemInterface,
    image: any,
  ): Promise<void> {
    const fileOptions = await this.#_uploadModel.uploadFile({
      file: image,
      destination: 'uploads/items',
    });

    await this.itemModel.create({
      name: itemData.name,
      description: itemData.description,
      count: itemData.count,
      cost: itemData.cost,
      country: itemData.country,
      image: fileOptions.imageUrl,
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
    const item = await this.itemModel.findByPk(id);

    await this.#_uploadModel.removeFile({ fileName: item.image });

    await this.itemModel.destroy({
      where: {
        id,
      },
    });
  }
}
