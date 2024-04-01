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

  async signUp(email: string, pass: string) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(pass, saltOrRounds);

    await this.usersService.createUser({ email, password: hashPassword });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.getUser({ email });
    const userProfile = await this.profilesService.getProfile({
      userId: user.id,
    });
    const isPassword = await bcrypt.compare(pass, user?.password);

    if (!isPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: userProfile.name };
    const generatedToken = await this.jwtService.signAsync(payload);
    const { token } = await this.tokenService.createToken({
      token: generatedToken,
      user: {
        create: undefined,
        connectOrCreate: {
          where: undefined,
          create: undefined,
        },
        connect: undefined,
      },
    });

    return {
      access_token: token,
    };
  }
}
