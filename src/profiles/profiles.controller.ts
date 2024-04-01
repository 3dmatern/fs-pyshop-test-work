import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Profile, ProfilesService } from './profiles.service';
import { AppGuard } from '../app.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AppGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<Profile> {
    const findProfile = this.profilesService.findOne(+id);

    return findProfile;
  }
}
