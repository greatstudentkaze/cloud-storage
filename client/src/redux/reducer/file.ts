const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_DIR_TO_STACK = 'PUSH_DIR_TO_STACK';
const POP_DIR_FROM_STACK = 'POP_DIR_FROM_STACK';

const initialState = {
  files: [],
  currentDirectory: null,
  isShowPopup: false,
  dirStack: [],
};

export const setFiles = (files: []) => ({
  type: SET_FILES,
  payload: files,
});

export const setCurrentDirectory = (directory: []) => ({
  type: SET_CURRENT_DIR,
  payload: directory,
});

export const addFile = (file: any) => ({
  type: ADD_FILE,
  payload: file,
});

export const setPopupDisplay = (isShow: boolean) => ({
  type: SET_POPUP_DISPLAY,
  payload: isShow,
});

export const pushDirToStack = (directoryId: string) => ({
  type: PUSH_DIR_TO_STACK,
  payload: directoryId,
});

export const popDirFromStack = () => ({
  type: POP_DIR_FROM_STACK,
});

const fileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDirectory: action.payload
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case SET_POPUP_DISPLAY:
      return {
        ...state,
        isShowPopup: action.payload
      };
    case PUSH_DIR_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload]
      };
    case POP_DIR_FROM_STACK:
      return {
        ...state,
        dirStack: state.dirStack.slice(0, state.dirStack.length - 1)
      };
    default:
      return state;
  }
};

export default fileReducer;
