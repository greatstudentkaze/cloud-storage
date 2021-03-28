import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/store';

import * as ActionType from '../redux/actions/types/file';

import { IFile } from '../interfaces';
import { ViewType } from '../types';
import { ActionsType } from '../redux/actions/file';
import { ActionsType as AppActionsType } from '../redux/actions/app';
import { ActionsType as UploaderActionsType } from '../redux/actions/uploader';

export namespace ResponseType {
  export type Files = IFile[];

  export type CreateDirectory = IFile;

  export type UploadFile = IFile;

  export type DeleteFile = { message: string };

  export type SearchFiles = IFile[];
}

export namespace ActionInterface {
  export interface SetFiles { type: typeof ActionType.SET_FILES, payload: IFile[] }

  export interface SetCurrentDirectory { type: typeof ActionType.SET_CURRENT_DIR, payload: IFile['_id'] }

  export interface AddFile { type: typeof ActionType.ADD_FILE, payload: IFile }

  export interface SetPopupDisplay { type: typeof ActionType.SET_POPUP_DISPLAY, payload: boolean }

  export interface PushDirToStack { type: typeof ActionType.PUSH_DIR_TO_STACK, payload: IFile['_id'] }

  export interface PopDirFromStack { type: typeof ActionType.POP_DIR_FROM_STACK }

  export interface DeleteFileSuccess { type: typeof ActionType.DELETE_FILE_SUCCESS, payload: IFile['_id'] }

  export interface SetView { type: typeof ActionType.SET_VIEW, payload: ViewType }
}

export namespace ThunkActionType {
  export type Default = ThunkAction<void, RootState, unknown, ActionsType>;

  export type WithAppActions = ThunkAction<void, RootState, unknown, ActionsType | AppActionsType>;

  export type WithUploaderActions = ThunkAction<void, RootState, unknown, ActionsType | UploaderActionsType>;
}
