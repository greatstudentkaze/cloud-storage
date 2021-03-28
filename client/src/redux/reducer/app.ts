import * as ActionType from '../actions/types/app';

import { ActionsType } from '../actions/app';

const initialState = {
  isShowLoader: false,
};

type State = typeof initialState;

const appReducer = (state = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionType.SHOW_LOADER:
      return {
        ...state,
        isShowLoader: true,
      };
    case ActionType.HIDE_LOADER:
      return {
        ...state,
        isShowLoader: false,
      };
    default:
      return state;
  }
};

export default appReducer;
