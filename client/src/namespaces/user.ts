import { IUserData } from '../interfaces';

export namespace ResponseType {
  export type Registration = { message: 'User was created' };

  type TokenAndUserData = {
    token: string,
    user: IUserData,
  };

  export type Login = TokenAndUserData;

  export type Auth = TokenAndUserData;

  export type UploadAvatar = IUserData;

  export type DeleteAvatar = IUserData;
}
