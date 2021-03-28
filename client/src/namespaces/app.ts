import * as ActionType from '../redux/actions/types/app';

export namespace ActionInterface {
  export interface ShowLoader { type: typeof ActionType.SHOW_LOADER }

  export interface HideLoader { type: typeof ActionType.HIDE_LOADER }
}
