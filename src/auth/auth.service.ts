import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile, ProfilesService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private profilesService: ProfilesService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user_profile: Profile }> {
    const user = await this.usersService.findOne(email);
    const userProfile = await this.profilesService.findOne(user.id);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: userProfile.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_profile: userProfile,
    };
  }
}
