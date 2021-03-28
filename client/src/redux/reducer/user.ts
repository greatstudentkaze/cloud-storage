import * as ActionType from '../actions/types/user';

import { IUserData } from '../../interfaces';

const initialState = {
  currentUser: {} as IUserData,
  isAuthorized: false,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthorized: true,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        currentUser: {},
        isAuthorized: false,
      };
    default:
      return state;
  }
};

export default userReducer;
