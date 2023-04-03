import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authLogout } from "../services/authentication.service";
import { showAlert } from "@/features/Common";

const initialState = {
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
  isLoading: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authenticationSlice.actions;

export const selectToken = (state) => state.authentication.token;
export const selectIsLoggedIn = (state) => state.authentication.isLoggedIn;

export const loginUser = (email, password) => async (dispatch) => {
  console.info("logging in");
  try {
    dispatch(setLoading(true));
    const response = await authLogin(email, password);
    dispatch(login(response));
    dispatch(setLoading(false));
  } catch (error) {
    // console.error(error);
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(
        showAlert({
          title: error?.response?.data?.message,
          description: error?.response?.data?.description,
          severity: error?.response?.data?.severity,
        })
      );
    }
  }
};

export const logoutUser = () => async (dispatch) => {
  console.info("logging out");
  authLogout();
  dispatch(logout());
};

export default authenticationSlice.reducer;
