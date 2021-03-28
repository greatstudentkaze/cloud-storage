import axios from 'axios';

import { API_URL } from '../../constants';
import { IFile } from '../../interfaces';
import { ViewType } from '../../types';
import { ResponseType, ActionInterface, ThunkActionType } from '../../namespaces/file';

import * as ActionType from './types/file';
import { addUploadFile, changeUploadFile, showUploader } from './uploader';
import { hideLoader, showLoader } from './app';

export type ActionsType = ActionInterface.SetFiles | ActionInterface.SetCurrentDirectory | ActionInterface.AddFile |
  ActionInterface.SetPopupDisplay | ActionInterface.PushDirToStack | ActionInterface.PopDirFromStack |
  ActionInterface.DeleteFileSuccess | ActionInterface.SetView;

export const setFiles = (files: IFile[]): ActionInterface.SetFiles => ({
  type: ActionType.SET_FILES,
  payload: files,
});

export const setCurrentDirectory = (directory: IFile['_id']): ActionInterface.SetCurrentDirectory => ({
  type: ActionType.SET_CURRENT_DIR,
  payload: directory,
});

export const addFile = (file: IFile): ActionInterface.AddFile => ({
  type: ActionType.ADD_FILE,
  payload: file,
});

export const setPopupDisplay = (isShow: boolean): ActionInterface.SetPopupDisplay => ({
  type: ActionType.SET_POPUP_DISPLAY,
  payload: isShow,
});

export const pushDirToStack = (directoryId: IFile['_id']): ActionInterface.PushDirToStack => ({
  type: ActionType.PUSH_DIR_TO_STACK,
  payload: directoryId,
});

export const popDirFromStack = (): ActionInterface.PopDirFromStack => ({
  type: ActionType.POP_DIR_FROM_STACK,
});

export const deleteFileSuccess = (fileId: IFile['_id']): ActionInterface.DeleteFileSuccess => ({
  type: ActionType.DELETE_FILE_SUCCESS,
  payload: fileId
});

export const setView = (view: ViewType): ActionInterface.SetView => ({
  type: ActionType.SET_VIEW,
  payload: view,
});

export const getFiles = (directoryId: string, sort?: string): ThunkActionType.WithAppActions => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url: string;

      if (directoryId && sort) {
        url = `${API_URL}api/files?parent=${directoryId}&sort=${sort}`;
      } else if (directoryId) {
        url = `${API_URL}api/files?parent=${directoryId}`;
      } else if (sort) {
        url = `${API_URL}api/files?sort=${sort}`;
      } else {
        url = `${API_URL}api/files`;
      }

      const response = await axios.get<ResponseType.Files>(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      dispatch(setFiles(response.data));
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  }
};

export const createDirectory = (directoryId: string, name: string): ThunkActionType.Default => {
  return async (dispatch) => {
    try {
      const response = await axios.post<ResponseType.CreateDirectory>(`${API_URL}api/files`, {
        name,
        parent: directoryId,
        type: 'dir',
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      dispatch(addFile(response.data));
    } catch (err) {
      alert(err.response.data);
    }
  }
};

export const uploadFile = (file: File, directoryId?: string): ThunkActionType.WithUploaderActions => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      if (directoryId) {
        formData.append('parent', directoryId);
      }

      const uploadFile = { name: file.name, progress: 0, id: `${Date.now() + file.name}` };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));

      const response = await axios.post<ResponseType.UploadFile>(`${API_URL}api/files/upload`,
        formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

          if (totalLength) {
            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
            dispatch(changeUploadFile(uploadFile.id, progress))
          }
        }
      });
      dispatch(addFile(response.data));
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const downloadFile = async (file: IFile) => {
  try {
    const response = await axios.get(`${API_URL}api/files/download?id=${file._id}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    if (response.status === 200) {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  } catch (err) {
    alert(err.response.data.message);
  }
};

export const deleteFile = (file: IFile): ThunkActionType.Default => {
  return async (dispatch) => {
    try {

      const response = await axios.delete<ResponseType.DeleteFile>(`${API_URL}api/files?id=${file._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      dispatch(deleteFileSuccess(file._id));
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const searchFiles = (searchQuery: string): ThunkActionType.WithAppActions => {
  return async (dispatch) => {
    try {
      const response = await axios.get<ResponseType.SearchFiles>(`${API_URL}api/files/search?query=${searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      dispatch(setFiles(response.data));
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  }
};
