import { Controller } from "@nestjs/common";
import { ImageUploadService } from "./image-upload.service";

@Controller()
export class ImageUploadController{
    constructor(private service: ImageUploadService) {}

    addImage(image:any):void{
        this.service.addOneImage(image)
    }
}