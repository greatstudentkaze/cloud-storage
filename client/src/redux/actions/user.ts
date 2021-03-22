import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { setUser } from '../reducer/user';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:9111/api/auth/registration', { email, password });

    alert(response.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};

type LoginActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const login = (email: string, password: string): LoginActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:9111/api/auth/login', { email, password });

      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

