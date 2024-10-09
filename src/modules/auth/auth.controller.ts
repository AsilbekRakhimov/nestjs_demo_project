import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto, SignInDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignNewTokensDto } from './dtos/sign-new-tokens.dto';
import { TokenExpiredError } from 'jsonwebtoken';
import { Protected } from 'src/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  // log in
  @ApiOperation({
    description: 'Log in',
    summary: 'You can log in here !',
  })
  @Post('/log-in')
  async logIn(@Body() userData: LogInUserDto): Promise<any> {
    try {
      const data = await this.service.logInUser(userData);
      return { message: 'Successfully logged in', data: { ...data } };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // sign in
  @ApiOperation({
    description: 'Sign in',
    summary: 'You can sign in here !',
  })
  @Post('/sign-in')
  async signIn(@Body() userData: SignInDto): Promise<any> {
    try {      
      const data = await this.service.signInUser(userData);
      if (!data) {
        return { message: 'Password yoki email xato kiritildi!' };
      }
      return { message: 'Successfully signed in', data: { ...data } };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // sign new tokens
  @ApiOperation({
    description: 'Sign new tokens',
    summary: 'You can sign new tokens here !',
  })
  @Post('/sign-new-tokens')
  async signNewTokens(
    @Body() oldRefreshTokenData: SignNewTokensDto,
  ): Promise<any> {
    try {
      const data = await this.service.signNewRefreshTokens(oldRefreshTokenData);
      if (!data) {
        return {
          message: 'Foydalanuvchi topilmadi',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        accessToken: data.newAccessToken,
        refreshToken: data.newRefreshToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Refresh token is expired');
      } else {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }
}
