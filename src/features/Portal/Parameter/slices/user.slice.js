import { createSlice } from "@reduxjs/toolkit";
import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "../services/user.service";
import { clearAlert, showAlert } from "@/features/Common";

const initialState = {
  data: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    getSingle: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addSingle: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    updateSingle: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    clear: (state) => {
      state.data = null;
      state.setLoading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getAll, getSingle, addSingle, updateSingle, setLoading, clear } =
  userSlice.actions;

// export const selectToken = (state) => state.authentication.token;
// export const selectIsLoggedIn = (state) => state.authentication.isLoggedIn;

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getAllParameters();
    dispatch(getAll(response));
    dispatch(setLoading(false));
  } catch (error) {
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

export const getUser = (id) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));
    dispatch(clear());
    const response = await getSingleParameter(id);
    dispatch(getSingle(response));
    dispatch(setLoading(false));
  } catch (error) {
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

export const addUser = (data) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));
    dispatch(clear());
    const response = await addParameter(data);
    dispatch(addSingle(response?.data));
    dispatch(
      showAlert({
        title: response?.message,
        description: response?.description,
        severity: response?.severity,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
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

export const updateUser = (id, data) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));
    dispatch(clear());
    const response = await updateParameter(id, data);
    dispatch(updateSingle(response?.data));
    dispatch(
      showAlert({
        title: response?.message,
        description: response?.description,
        severity: response?.severity,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
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

export const deleteUser = (id) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));
    const opsResponse = await deleteParameter(id);
    dispatch(
      showAlert({
        title: opsResponse?.message,
        description: opsResponse?.description,
        severity: opsResponse?.severity,
      })
    );
    const dataResponse = await getAllParameters();
    dispatch(getAll(dataResponse));
    dispatch(setLoading(false));
  } catch (error) {
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

export default userSlice.reducer;
