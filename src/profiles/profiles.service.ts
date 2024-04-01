import { Injectable } from '@nestjs/common';
import { Prisma, PyShopProfile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type Profile = {
  id: string;
  userId: string;
  name: string;
  tel: string;
  address: string;
  aboutMe: string;
};

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async createProfile(
    data: Prisma.PyShopProfileCreateInput,
  ): Promise<PyShopProfile> {
    return this.prisma.pyShopProfile.create({ data });
  }

  async getProfile(
    profileWhereUniqueInput: Prisma.PyShopProfileWhereUniqueInput,
  ): Promise<PyShopProfile | null> {
    return this.prisma.pyShopProfile.findUnique({
      where: profileWhereUniqueInput,
    });
  }
}
