import { combineReducers, Reducer } from 'redux';

import user from './user';
import file from './file';
import uploader from './uploader';
import app from './app';

const rootReducer: Reducer = combineReducers({
  app,
  user,
  file,
  uploader,
});

export default rootReducer;
