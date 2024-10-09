import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveFileDto, UploadFileDto } from './dtos';
import { RemoveFileResponse, UploadFileResponse } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected } from 'src/decorators';
import { AccessedRoles } from 'src/decorators/roles.decorator';

@ApiTags('Upload')
@Controller()
export class ImageUploadController {
  constructor(private service: ImageUploadService) {}

  @Post('/add')
  @ApiBearerAuth()
  @Protected(true)
  @AccessedRoles(['admin'])
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Yangi file yaratish' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  @Delete("/remove")
  @ApiBearerAuth()
  @Protected(true)
  @AccessedRoles(['admin'])
  @ApiOperation({ summary: 'Mavjud faylni o\'chirish' })
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse> {
    return this.service.removeFile(payload);
  }
}
