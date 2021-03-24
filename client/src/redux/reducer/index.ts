import { combineReducers, Reducer } from 'redux';

import user from './user';
import file from './file';
import upload from './upload';

const rootReducer: Reducer = combineReducers({
  user,
  file,
  upload,
});

export default rootReducer;
