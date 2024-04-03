import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Profile, ProfilesService } from './profiles.service';
import { AppGuard } from '../app.guard';
import { ParseToken } from '../token/token.module';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AppGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProfile(@Param('id') id: string) {
    const findProfile = this.profilesService.findOne({ userId: id });

    return findProfile;
  }

  @UseGuards(AppGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  updateProfile(@Request() req, @Body() updateProfileDto: Profile) {
    const user: ParseToken = req.user;

    const updatedProfile = this.profilesService.update({
      where: {
        userId: user.sub,
      },
      data: updateProfileDto,
    });

    return updatedProfile;
  }
}
