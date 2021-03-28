import * as ActionType from './types/uploader';

import { IUploadFile } from '../../interfaces';
import { ActionInterface } from '../../namespaces/uploader';

export type ActionsType = ActionInterface.ShowUploader | ActionInterface.HideUploader | ActionInterface.AddUploadFile |
  ActionInterface.RemoveUploadFile | ActionInterface.ChangeUploadFile;

export const showUploader = (): ActionInterface.ShowUploader => ({
  type: ActionType.SHOW_UPLOADER,
});

export const hideUploader = (): ActionInterface.HideUploader => ({
  type: ActionType.HIDE_UPLOADER,
});

export const addUploadFile = (file: IUploadFile): ActionInterface.AddUploadFile => ({
  type: ActionType.ADD_UPLOAD_FILE,
  payload: file,
});

export const removeUploadFile = (fileId: IUploadFile['id']): ActionInterface.RemoveUploadFile => ({
  type: ActionType.REMOVE_UPLOAD_FILE,
  payload: fileId,
});

export const changeUploadFile = (fileId: IUploadFile['id'], progress: IUploadFile['progress']): ActionInterface.ChangeUploadFile => ({
  type: ActionType.CHANGE_UPLOAD_FILE,
  payload: {
    id: fileId,
    progress
  },
});
