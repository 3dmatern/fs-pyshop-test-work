import { Injectable } from '@nestjs/common';

export type Profile = {
  id: number;
  userId: number;
  name: string;
  tel: string;
  address: string;
  aboutMe: string;
};

@Injectable()
export class ProfilesService {
  private readonly profiles = [
    {
      id: 1,
      userId: 1,
      name: 'John',
      tel: '+375441234567',
      address: 'Belarus, Minsk',
      aboutMe: 'Обо мне',
    },
    {
      id: 2,
      userId: 2,
      name: 'Maria',
      tel: '+375441234567',
      address: 'Belarus, Gomel',
      aboutMe: 'Обо мне',
    },
  ];

  async findOne(userId: number): Promise<Profile | undefined> {
    return this.profiles.find((profile) => profile.userId === userId);
  }
}
