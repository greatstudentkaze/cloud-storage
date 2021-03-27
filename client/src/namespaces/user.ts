import { IUser } from '../interfaces';

export namespace ResponseType {
  export type Registration = { message: 'User was created' };

  type TokenAndUserData = {
    token: string,
    user: {
      id: IUser['_id'],
      email: IUser['email'],
      storageSpace: IUser['storageSpace'],
      usedSpace: IUser['usedSpace'],
      avatar: IUser['avatar'],
    },
  };

  export type Login = TokenAndUserData;

  export type Auth = TokenAndUserData;

  export type UploadAvatar = IUser;

  export type DeleteAvatar = IUser;
}
