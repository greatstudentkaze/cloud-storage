import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

import { API_URL } from '../../constants';
import * as ActionType from './types/user';

import { IUserData, IUser } from '../../interfaces';
import { ResponseType, ActionInterface } from '../../namespaces/user';

export type ActionsType = ActionInterface.LogOut | ActionInterface.SetUser;
type ThunkActionType = ThunkAction<void, RootState, unknown, ActionsType>;

export const setUser = (user: IUserData): ActionInterface.SetUser => ({
  type: ActionType.SET_USER,
  payload: user,
});

export const logOut = (): ActionInterface.LogOut => ({
  type: ActionType.LOGOUT,
});

export const registration = async (email: IUser['email'], password: IUser['password']) => {
  try {
    const response = await axios.post<ResponseType.Registration>(`${API_URL}api/auth/registration`, { email, password });

    alert(response.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const login = (email: IUser['email'], password: IUser['password']): ThunkActionType => {
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

export const auth = (): ThunkActionType => {
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

export const uploadAvatar = (avatarFile: File): ThunkActionType => {
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

export const deleteAvatar = (): ThunkActionType => {
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

