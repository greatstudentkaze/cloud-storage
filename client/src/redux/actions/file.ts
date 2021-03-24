import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

import { addFile, setFiles, deleteFile as deleteFileActionCreator } from '../reducer/file';
import { addUploadFile, changeUploadFile, showUploader } from '../reducer/upload';

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const getFiles = (directoryId: string, sort: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      let url: string;

      if (directoryId && sort) {
        url = `http://localhost:9111/api/files?parent=${directoryId}&sort=${sort}`;
      } else if (directoryId) {
        url = `http://localhost:9111/api/files?parent=${directoryId}`;
      } else if (sort) {
        url = `http://localhost:9111/api/files?sort=${sort}`;
      } else {
        url = 'http://localhost:9111/api/files';
      }

      const response = await axios.get(url, {
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

      const uploadFile = { name: file.name, progress: 0, id: `${Date.now() + file.name}` };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));

      const response = await axios.post(`http://localhost:9111/api/files/upload`,
        formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress: progressEvent => {
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

export const downloadFile = async (file: any) => {
  try {
    const response = await axios.get(`http://localhost:9111/api/files/download?id=${file._id}`, {
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

export const deleteFile = (file: any): ThunkAnyActionType => {
  return async (dispatch) => {
    try {

      const response = await axios.delete(`http://localhost:9111/api/files/${file._id}`, {
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
