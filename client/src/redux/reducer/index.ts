import { combineReducers } from 'redux';

import user from './user';
import file from './file';

const rootReducer = combineReducers({
  user,
  file,
});

export default rootReducer;
