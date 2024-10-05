import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from './models';
import { JwtService } from '@nestjs/jwt';
import { LogInInterface, SignInInterface } from './interfaces';
import { SignNewTokensInterface } from './interfaces/sign-new-tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel) private UserModel: typeof UsersModel,
    private jwtService: JwtService,
  ) {}

  // log in
  async logInUser(userData: LogInInterface): Promise<any> {
    const data = await this.UserModel.create({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      role: 'user',
    });
    const accessToken = await this.jwtService.signAsync(
      { id: data.id, role: data.role },
      {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: data.id, role: data.role },
      {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      },
    );
    return { accessToken, refreshToken };
  }

  // sign in
  async signInUser(userData: SignInInterface): Promise<any> {
    const data = await this.UserModel.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!data) {
      return null;
    }
    const foundedUser = data.dataValues;
    if (foundedUser.password == userData.password) {
      const accessToken = await this.jwtService.signAsync(
        {
          id: foundedUser.id,
          role: foundedUser.role,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET_KEY,
          expiresIn: process.env.JWT_ACCESS_EXPIRES,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        {
          id: foundedUser.id,
          role: foundedUser.role,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
          expiresIn: process.env.JWT_REFRESH_EXPIRES,
        },
      );
      return { accessToken, refreshToken };
    }
    return null;
  }

  // sign refresh token
  async signNewRefreshTokens(data: SignNewTokensInterface): Promise<any> {
    const result = await this.jwtService.verifyAsync(data.oldRefreshToken, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });
    const user = await this.UserModel.findOne({
      where: {
        id: result.id,
      },
    });
    if (!user) {
      return null;
    }
    const newAccessToken = await this.jwtService.signAsync(
      { id: result.id, role: result.role },
      {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      },
    );
    const newRefreshToken = await this.jwtService.signAsync(
      {
        id: result.id,
        role: result.role,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      },
    );
    return { newAccessToken, newRefreshToken };
  }
}
