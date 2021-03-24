const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

export const showLoader = () => ({
  type: SHOW_LOADER,
});


export const hideLoader = () => ({
  type: HIDE_LOADER,
});

const initialState = {
  isShowLoader: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        isShowLoader: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isShowLoader: false,
      };
    default:
      return state;
  }
};

export default appReducer;
