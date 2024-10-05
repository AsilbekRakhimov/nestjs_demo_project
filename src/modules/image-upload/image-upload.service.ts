import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageUploadService {
  addOneImage(image: any): void {
    console.log(image);
  }
}
