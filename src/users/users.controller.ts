import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AppGuard } from 'src/app.guard';
import { ParseToken } from 'src/token/token.module';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AppGuard)
  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteUser(@Request() req) {
    const user: ParseToken = req.user;

    return this.usersService.delete({ id: user.sub });
  }
}
