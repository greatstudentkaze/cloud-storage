const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

export const setUser = (user: {}) => ({
  type: SET_USER,
  payload: user,
});

export const logOut = () => ({
  type: LOGOUT,
});

const initialState = {
  currentUser: {},
  isAuthorized: false,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthorized: true,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: {},
        isAuthorized: false,
      };
    default:
      return state;
  }
};

export default userReducer;
