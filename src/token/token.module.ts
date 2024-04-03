import { Module } from '@nestjs/common';

import { TokenService } from './token.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}

export type ParseToken = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};
