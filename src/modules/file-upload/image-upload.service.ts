import { Injectable } from '@nestjs/common';
import {
  RemoveFileRequest,
  RemoveFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from './interfaces';
import * as path from 'path';
import { existsSync } from 'fs';
import * as fs from 'fs/promises';

@Injectable()
export class ImageUploadService {
  constructor() {}
  async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    const fullFilePath = path.join(
      __dirname,
      '../../../',
      payload.destination,
      fileName,
    );

    const ifFileExists = existsSync(
      path.join(__dirname, '../../../', payload.destination),
    );

    if (!ifFileExists) {
      fs.mkdir(path.join(__dirname, '../../../', payload.destination));
    }

    await fs.writeFile(fullFilePath, payload.file.buffer);

    const imageUrl = `${payload.destination}/${fileName}`;
    return {
      imageUrl,
      message: 'Successfully written',
    };
  }

  async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
    const filePath = path.join(__dirname, '../../../', payload.fileName);

    const isFileExists = existsSync(filePath);

    // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
    if (isFileExists) {
      await fs.unlink(filePath);
    }

    return {
      message: 'File removed successfully',
    };
  }
}
