import * as ActionType from '../redux/actions/types/uploader';

import { IUploadFile } from '../interfaces';

export namespace ActionInterface {
  export interface ShowUploader { type: typeof ActionType.SHOW_UPLOADER }

  export interface HideUploader { type: typeof ActionType.HIDE_UPLOADER }

  export interface AddUploadFile { type: typeof ActionType.ADD_UPLOAD_FILE, payload: IUploadFile }

  export interface RemoveUploadFile { type: typeof ActionType.REMOVE_UPLOAD_FILE, payload: IUploadFile['id'] }

  export interface ChangeUploadFile { type: typeof ActionType.CHANGE_UPLOAD_FILE, payload: { id: IUploadFile['id'], progress: IUploadFile['progress'] } }
}
