import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { IUser } from '../interfaces/user.interface';
import { IUserLink } from '../interfaces/user-link.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return [];
  }

  public async searchUserById(id: string): Promise<IUser> {
    return null;
  }

  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ): Promise<IUser> {
    return null;
  }

  public async createUser(user: IUser): Promise<IUser> {
    return null;
  }

  public async createUserLink(id: string): Promise<IUserLink> {
    return null;
  }

  public async getUserLink(link: string): Promise<IUserLink[]> {
    return null;
  }

  public async updateUserLinkById(
    id: string,
    linkParams: { is_used: boolean },
  ): Promise<IUserLink> {
    return null;
  }

  public getConfirmationLink(link: string): string {
    return `${this.configService.get('baseUri')}:${this.configService.get(
      'gatewayPort',
    )}/users/confirm/${link}`;
  }
}
