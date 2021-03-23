const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';

const initialState = {
  files: [],
  currentDirectory: null,
  isShowPopup: false,
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
    default:
      return state;
  }
};

export default fileReducer;
