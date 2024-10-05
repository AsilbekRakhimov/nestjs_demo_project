import { ApiProperty } from '@nestjs/swagger';
import { LogInInterface } from '../interfaces';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LogInUserDto implements LogInInterface {
  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    description: "Bu yerga ism-familya to'liq kiritiladi",
    example: 'Asilbek Rahimov',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 12,
    description: "Bu yerga email to'liq kiritiladi",
    example: 'asilbekrakhimov5@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    minLength: 4,
    description: 'Bu yerga password kiritiladi',
    example: 'aa44',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    minLength: 9,
    description: "Bu yerga telefon to'liq kiritiladi",
    example: '932164333',
  })
  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;
}
