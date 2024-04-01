import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppGuard } from '../app.guard';

interface AuthDto {
  email: string;
  password: string;
}

export interface SignInDto extends AuthDto {}
export interface SignUpDto extends AuthDto {}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AppGuard)
  @Get('token')
  refreshToken(@Request() req) {
    return req.user;
  }
}
