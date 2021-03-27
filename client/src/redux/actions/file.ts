import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

import { API_URL } from '../../constants';
import { IFile } from '../../interfaces';
import { ResponseType } from '../../namespaces/file';

import { addFile, setFiles, deleteFile as deleteFileActionCreator } from '../reducer/file';
import { addUploadFile, changeUploadFile, showUploader } from '../reducer/upload';
import { hideLoader, showLoader } from '../reducer/app';

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const getFiles = (directoryId: string, sort?: string): ThunkAnyActionType => {
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

export const createDirectory = (directoryId: string, name: string): ThunkAnyActionType => {
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

export const uploadFile = (file: File, directoryId?: string): ThunkAnyActionType => {
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

export const deleteFile = (file: IFile): ThunkAnyActionType => {
  return async (dispatch) => {
    try {

      const response = await axios.delete<ResponseType.DeleteFile>(`${API_URL}api/files?id=${file._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      dispatch(deleteFileActionCreator(file._id));
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const searchFiles = (searchQuery: string): ThunkAnyActionType => {
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
