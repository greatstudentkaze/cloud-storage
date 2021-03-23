import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

type ThunkAnyActionType = ThunkAction<void, RootState, unknown, AnyAction>

export const getFiles = (directoryId: string): ThunkAnyActionType => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:9111/api/files${directoryId ? `?parent=${directoryId}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      console.log(response.data)
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};
