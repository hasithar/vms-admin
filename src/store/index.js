import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../features/Auth";
import { alertReducer } from "../features/Common";

const reducer = {
  alert: alertReducer,
  authentication: authenticationReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
