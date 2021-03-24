import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

import { addFile, setFiles } from '../reducer/file';

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const getFiles = (directoryId: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:9111/api/files${directoryId ? `?parent=${directoryId}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      dispatch(setFiles(response.data));
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const createDirectory = (directoryId: string, name: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:9111/api/files`, {
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
      alert(err.response.data.message);
    }
  }
};

export const uploadFile = (file: File, directoryId?: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      if (directoryId) {
        formData.append('parent', directoryId);
      }

      const response = await axios.post(`http://localhost:9111/api/files/upload`,
        formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

          console.log(totalLength);

          if (totalLength) {
            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
            console.log(progress)
          }
        }
      });
      dispatch(addFile(response.data));
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};
