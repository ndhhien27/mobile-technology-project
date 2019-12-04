import * as types from '../constants';

const initialState = {
  authToken: null,
  userId: null,
  userInfo: {},
  loginError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authToken: payload.authToken,
        userId: payload.userId,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        loginError: payload.error,
      };
    default:
      return state;
  }
};
