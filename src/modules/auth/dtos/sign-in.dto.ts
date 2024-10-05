import { ApiProperty } from '@nestjs/swagger';
import { SignInInterface } from '../interfaces';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto implements SignInInterface {
  @ApiProperty({
    type: String,
    required: true,
    description: "Bu yerga email to'liq kiritilishi kerak",
    example: 'asilbekrakhimov5@gmail.com',
    minLength: 12,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Bu yerga passwordni kiriting!',
    example: 'asdfghjkl2345678',
    minLength: 6,
  })
  @IsStrongPassword()
  @IsString()
  password: string;
}
