import {
  Body,
  Controller,
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

export interface SignUpDto extends AuthDto {
  username: string;
}
export interface SignInDto extends AuthDto {}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    this.authService.signUp(
      signUpDto.username,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AppGuard)
  @HttpCode(HttpStatus.OK)
  @Post('token')
  refreshToken(@Request() req) {
    const user = req.user;

    return this.authService.refreshToken(user);
  }
}
