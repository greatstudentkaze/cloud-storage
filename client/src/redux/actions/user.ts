import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

import { API_URL } from '../../constants';
import { IUser } from '../../interfaces';
import { ResponseType } from '../../namespaces/user';

import { setUser } from '../reducer/user';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post<ResponseType.Registration>(`${API_URL}api/auth/registration`, { email, password });

    alert(response.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const login = (email: IUser['email'], password: IUser['password']): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.post<ResponseType.Login>(`${API_URL}api/auth/login`, { email, password });

      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const auth = (): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.get<ResponseType.Auth>(`${API_URL}api/auth/auth`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
    } catch (err) {
      localStorage.removeItem('token');
    }
  }
};

export const uploadAvatar = (avatarFile: File): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', avatarFile);

      const response = await axios.post<ResponseType.UploadAvatar>(`${API_URL}api/files/avatar`,
        formData,
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err)
    }
  }
};

export const deleteAvatar = (): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.delete<ResponseType.DeleteAvatar>(`${API_URL}api/files/avatar`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err)
    }
  }
};

