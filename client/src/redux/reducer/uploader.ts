import * as ActionType from '../actions/types/uploader';

import { IUploadFile } from '../../interfaces';
import { ActionsType } from '../actions/uploader';

type Files = IUploadFile[];

const initialState = {
  isVisible: false,
  files: [] as Files,
};

type State = typeof initialState;

const uploaderReducer = (state = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionType.SHOW_UPLOADER:
      return {
        ...state,
        isVisible: true
      };
    case ActionType.HIDE_UPLOADER:
      return {
        ...state,
        isVisible: false
      };
    case ActionType.ADD_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, { ...action.payload }]
      };
    case ActionType.REMOVE_UPLOAD_FILE:
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload)
      };
    case ActionType.CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: state.files.map(file => file.id === action.payload.id
          ? {...file, progress: action.payload.progress}
          : file
        )
      };
    default:
      return state;
  }
};

export default uploaderReducer;
