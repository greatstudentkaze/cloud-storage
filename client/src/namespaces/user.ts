import * as ActionType from '../redux/actions/types/user';

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

export namespace ActionInterface {
  export interface LogOut { type: typeof ActionType.LOGOUT }

  export interface SetUser { type: typeof ActionType.SET_USER, payload: IUserData }
}
