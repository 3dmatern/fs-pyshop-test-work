import { Injectable } from '@nestjs/common';
import { Prisma, PyShopUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.PyShopUserCreateInput) {
    this.prisma.pyShopUser.create({
      data,
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.PyShopUserWhereUniqueInput,
  ): Promise<PyShopUser | null> {
    return this.prisma.pyShopUser.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async updateUser(params: {
    where: Prisma.PyShopUserWhereUniqueInput;
    data: Prisma.PyShopUserUpdateInput;
  }): Promise<PyShopUser> {
    const { where, data } = params;

    return this.prisma.pyShopUser.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.PyShopUserWhereUniqueInput,
  ): Promise<PyShopUser> {
    return this.prisma.pyShopUser.delete({
      where,
    });
  }
}
