import { IsNumberString, IsString } from 'class-validator';
import { UpdateItemInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto implements UpdateItemInterface {
  @ApiProperty({
    description: 'Bu yerga item nomi kiritiladi.',
    example: 'smartphone',
    minLength: 3,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Bu yerga item haqida ma'lumot yoki sharh kiritiladi.",
    example: 'Iphone 15 Pro Max',
    minLength: 3,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Bu yerga item narxi kiritiladi.',
    example: 500000,
    minimum: 100,
  })
  @IsNumberString()
  cost: number;

  @ApiProperty({
    description: "Bu yerga item sanog'i kiritiladi.",
    example: 50,
    minimum:0
  })
  @IsNumberString()
  count: number;

  @ApiProperty({
    description: 'Bu yerga item ishlab chiqarilgan davlat nomi kiritiladi.',
    example: 'Japan',
    minLength: 3,
  })
  @IsNumberString()
  country: string;

  @ApiProperty({
    description: 'Bu yerga item rasmi kiritiladi.',
    type: 'string',
    format: 'binary',
  })
  image: string;
}
