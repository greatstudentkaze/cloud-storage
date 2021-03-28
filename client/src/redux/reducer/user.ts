import * as ActionType from '../actions/types/user';

import { IUserData } from '../../interfaces';
import { ActionsType } from '../actions/user';

type CurrentUser = IUserData | null;

const initialState = {
  currentUser: null as CurrentUser,
  isAuthorized: false,
};

type State = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): State => {
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
        currentUser: null,
        isAuthorized: false,
      };
    default:
      return state;
  }
};

export default userReducer;
