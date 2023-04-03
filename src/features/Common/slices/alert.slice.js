import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  description: null,
  severity: null,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.severity = action.payload.severity;
    },
    clearAlert: (state) => {
      state.title = null;
      state.description = null;
      state.severity = null;
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export const selectAlertTitle = (state) => state.alert.title;
export const selectAlertDescription = (state) => state.alert.description;
export const selectAlertSeverity = (state) => state.alert.severity;

export default alertSlice.reducer;
