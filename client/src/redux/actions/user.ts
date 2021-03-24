import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

import { API_URL } from '../../constants';
import { setUser } from '../reducer/user';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, { email, password });

    alert(response.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const login = (email: string, password: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, { email, password });

      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

export const auth = (): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
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

      const response = await axios.post(`${API_URL}api/files/avatar`,
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
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err)
    }
  }
};

