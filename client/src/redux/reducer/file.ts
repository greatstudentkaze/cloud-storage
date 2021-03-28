import * as ActionType from '../actions/types/file';

import { IFile } from '../../interfaces';

const initialState = {
  files: [],
  currentDirectory: null,
  isShowPopup: false,
  dirStack: [],
  view: 'list',
};

const fileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_FILES:
      return {
        ...state,
        files: action.payload
      };
    case ActionType.SET_CURRENT_DIR:
      return {
        ...state,
        currentDirectory: action.payload
      };
    case ActionType.ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case ActionType.SET_POPUP_DISPLAY:
      return {
        ...state,
        isShowPopup: action.payload
      };
    case ActionType.PUSH_DIR_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload]
      };
    case ActionType.POP_DIR_FROM_STACK:
      return {
        ...state,
        dirStack: state.dirStack.slice(0, state.dirStack.length - 1)
      };
    case ActionType.DELETE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.filter((file: IFile) => file._id !== action.payload)
      };
    case ActionType.SET_VIEW:
      return {
        ...state,
        view: action.payload
      };
    default:
      return state;
  }
};

export default fileReducer;
