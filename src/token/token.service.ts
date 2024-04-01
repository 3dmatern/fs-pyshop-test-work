import { Injectable } from '@nestjs/common';
import { Prisma, PyShopToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createToken(data: Prisma.PyShopTokenCreateInput): Promise<PyShopToken> {
    return this.prisma.pyShopToken.create({
      data,
    });
  }

  async getToken(
    tokenWhereUniqueInput: Prisma.PyShopTokenWhereUniqueInput,
  ): Promise<PyShopToken> {
    return this.prisma.pyShopToken.findUnique({
      where: tokenWhereUniqueInput,
    });
  }

  async refreshToken(params: {
    where: Prisma.PyShopTokenWhereUniqueInput;
    data: Prisma.PyShopTokenUpdateInput;
  }): Promise<PyShopToken> {
    const { where, data } = params;

    return this.prisma.pyShopToken.update({
      data,
      where,
    });
  }

  async deleteToken(
    where: Prisma.PyShopTokenWhereUniqueInput,
  ): Promise<PyShopToken> {
    return this.prisma.pyShopToken.delete({ where });
  }
}
