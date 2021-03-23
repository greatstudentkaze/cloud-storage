import { combineReducers, Reducer } from 'redux';

import user from './user';
import file from './file';

const rootReducer: Reducer = combineReducers({
  user,
  file,
});

export default rootReducer;
