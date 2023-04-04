import authenticationReducer, {
  selectIsLoggedIn,
  selectToken,
  loginUser,
  logoutUser,
} from "./slices/authentication.slice";

import {
  authLogin,
  authLogout,
  authGetCurrentUser,
} from "./services/authentication.service";

export {
  authenticationReducer,
  selectIsLoggedIn,
  selectToken,
  loginUser,
  logoutUser,
  authLogin,
  authLogout,
  authGetCurrentUser,
};
