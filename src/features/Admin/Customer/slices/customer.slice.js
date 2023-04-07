import { createSlice } from "@reduxjs/toolkit";
import { fetchAll, deleteSingle } from "../services/customer.service";
import { clearAlert, showAlert } from "@/features/Common";

const initialState = {
  data: [],
  loading: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getAll: (state, action) => {
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

export const { getAll, setLoading, clear } = customerSlice.actions;

// export const selectToken = (state) => state.authentication.token;
// export const selectIsLoggedIn = (state) => state.authentication.isLoggedIn;

export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAll();
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

export const deleteCustomer = (id) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));
    const opsResponse = await deleteSingle(id);
    dispatch(
      showAlert({
        title: opsResponse?.message,
        description: opsResponse?.description,
        severity: opsResponse?.severity,
      })
    );
    const dataResponse = await fetchAll();
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

export default customerSlice.reducer;
