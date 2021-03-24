import { combineReducers, Reducer } from 'redux';

import user from './user';
import file from './file';
import upload from './upload';
import app from './app';

const rootReducer: Reducer = combineReducers({
  app,
  user,
  file,
  upload,
});

export default rootReducer;
