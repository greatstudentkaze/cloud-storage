import * as ActionType from './types/app';

import { ActionInterface } from '../../namespaces/app';

export type ActionsType = ActionInterface.ShowLoader | ActionInterface.HideLoader;

export const showLoader = (): ActionInterface.ShowLoader => ({
  type: ActionType.SHOW_LOADER,
});

export const hideLoader = (): ActionInterface.HideLoader => ({
  type: ActionType.HIDE_LOADER,
});
