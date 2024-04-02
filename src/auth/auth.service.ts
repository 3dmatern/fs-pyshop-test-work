import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { ProfilesService } from '../profiles/profiles.service';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async signUp(username: string, email: string, pass: string) {
    const { usernameTrim, isNotUsername } = this.validateUsername(username);
    const { emailTrim, isEmail } = this.validateEmail(email);
    const { passTrim, isNotPass } = this.validatePass(pass);

    if (isNotUsername || !isEmail || isNotPass) {
      throw new BadRequestException('Заполните все поля');
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(passTrim, saltOrRounds);

    const newUser = await this.usersService.create({
      email: emailTrim,
      password: hashPassword,
    });
    await this.profilesService.create({
      name: usernameTrim,
      user: {
        connect: {
          id: newUser.id,
        },
      },
    });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const { emailTrim, isEmail } = this.validateEmail(email);

    if (!isEmail) {
      throw new UnauthorizedException('Введите корректный email');
    }

    const user = await this.usersService.findOne({ email: emailTrim });

    if (!user) {
      throw new BadRequestException('Введите корректные данные');
    }

    const userProfile = await this.profilesService.findOne({
      userId: user.id,
    });
    const isPassword = await bcrypt.compare(pass, user?.password);

    if (!isPassword) {
      throw new UnauthorizedException('Введите корректные данные');
    }

    const payload = { sub: user.id, username: userProfile.name };
    const generatedToken = await this.jwtService.signAsync(payload);
    const oldToken = await this.tokenService.getToken({ userId: user.id });

    if (oldToken) {
      await this.tokenService.deleteToken({ userId: user.id });
    }

    const { token } = await this.tokenService.createToken({
      token: generatedToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    return {
      access_token: token,
    };
  }

  async refreshToken(user: { sub: string; username: string }): Promise<string> {
    const payload = { sub: user.sub, username: user.username };
    const generatedToken = await this.jwtService.signAsync(payload);
    const newAccessToken = await this.tokenService.refreshToken({
      where: { userId: user.sub },
      data: { token: generatedToken },
    });

    return newAccessToken.token;
  }

  private validateUsername(
    username: string | Prisma.StringFieldUpdateOperationsInput,
  ): {
    usernameTrim: string;
    isNotUsername: boolean;
  } {
    const usernameTrim = username.toString().trim();
    const isNotUsername =
      usernameTrim === '' ||
      usernameTrim.length < 2 ||
      usernameTrim.length > 30;

    return { usernameTrim, isNotUsername };
  }

  private validateEmail(email: string): {
    emailTrim: string;
    isEmail: boolean;
  } {
    const emailTrim = email.toString().trim();
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailTrim,
    );

    return { emailTrim, isEmail };
  }

  private validatePass(pass: string): {
    passTrim: string;
    isNotPass: boolean;
  } {
    const passTrim = pass.toString().trim();
    const isNotPass =
      passTrim === '' || passTrim.length < 6 || passTrim.length > 20;

    return { passTrim, isNotPass };
  }
}
