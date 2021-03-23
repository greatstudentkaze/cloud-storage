const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';

const initialState = {
  files: [],
  currentDirectory: null,
};

export const setFiles = (files: []) => ({
  type: SET_FILES,
  payload: files,
});

export const setCurrentDirectory = (directory: []) => ({
  type: SET_CURRENT_DIR,
  payload: directory,
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
    default:
      return state;
  }
};

export default fileReducer;
