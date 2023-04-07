import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "@features/Auth";
import { alertReducer } from "@features/Common";
import { customerReducer } from "@/features/Admin";

const reducer = {
  alert: alertReducer,
  authentication: authenticationReducer,
  customer: customerReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
