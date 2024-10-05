import { Module } from "@nestjs/common";
import { ImageUploadController } from "./image-upload.controller";
import { ImageUploadService } from "./image-upload.service";

@Module({
    controllers:[ImageUploadController],
    providers:[ImageUploadService]
})

export class ImageUploadModule {}