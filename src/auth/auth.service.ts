import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ProfilesService } from 'src/profiles/profiles.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async signUp(username: string, email: string, pass: string) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(pass, saltOrRounds);

    const newUser = await this.usersService.createUser({
      email,
      password: hashPassword,
    });
    await this.profilesService.createProfile({
      name: username,
      user: {
        connect: {
          id: newUser.id,
        },
      },
    });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.getUser({ email });
    const userProfile = await this.profilesService.getProfile({
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
}
