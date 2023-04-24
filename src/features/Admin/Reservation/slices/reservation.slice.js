import { createSlice } from "@reduxjs/toolkit";
import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "../services/reservation.service";
import { addParameter as customerAddParameter } from "../../Customer";
import { clearAlert, showAlert } from "@/features/Common";

const initialState = {
  allData: [],
  currentData: [],
  loading: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.allData = action.payload;
      state.loading = false;
    },
    getSingle: (state, action) => {
      state.currentData = action.payload;
      state.loading = false;
    },
    addSingle: (state, action) => {
      state.currentData = action.payload;
      state.loading = false;
    },
    updateSingle: (state, action) => {
      state.currentData = action.payload;
      state.loading = false;
    },
    clear: (state) => {
      state.allData = null;
      state.currentData = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getAll, getSingle, addSingle, updateSingle, setLoading, clear } =
  reservationSlice.actions;

// export const selectToken = (state) => state.authentication.token;
// export const selectIsLoggedIn = (state) => state.authentication.isLoggedIn;

// export const getAllAppointments = () => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const response = await getAllParameters();
//     dispatch(getAll(response));
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setLoading(false));
//     if (error.response) {
//       dispatch(
//         showAlert({
//           title: error?.response?.data?.message,
//           description: error?.response?.data?.description,
//           severity: error?.response?.data?.severity,
//         })
//       );
//     }
//   }
// };

// export const getCustomer = (id) => async (dispatch) => {
//   dispatch(clearAlert());

//   try {
//     dispatch(setLoading(true));
//     const response = await getSingleParameter(id);
//     dispatch(getSingle(response));
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setLoading(false));
//     if (error.response) {
//       dispatch(
//         showAlert({
//           title: error?.response?.data?.message,
//           description: error?.response?.data?.description,
//           severity: error?.response?.data?.severity,
//         })
//       );
//     }
//   }
// };

export const addReservationNewCustomer = (data) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));

    const { customerData, appointMentData } = data;
    const customerResponse = await customerAddParameter(customerData);

    const opsResponse = await addParameter({
      customer: {
        id: customerResponse?.data?._id,
        name: `${customerResponse?.data?.firstname} ${customerResponse?.data?.lastname}`,
        phone: customerResponse?.data?.phone,
        email: customerResponse?.data?.email,
      },
      date: appointMentData?.date,
      time: appointMentData?.time,
      referredBy: appointMentData?.referredBy,
      assignedTo: appointMentData?.assignedTo,
      status: appointMentData?.status,
      comments: appointMentData?.comments,
    });
    dispatch(addSingle(opsResponse?.data));

    const dataResponse = await getAllParameters();
    dispatch(getAll(dataResponse));
    dispatch(
      showAlert({
        title: opsResponse?.message,
        description: opsResponse?.description,
        severity: opsResponse?.severity,
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

export const addReservationExistingCustomer = (data) => async (dispatch) => {
  dispatch(clearAlert());

  try {
    dispatch(setLoading(true));

    const { customerData, appointMentData } = data;

    const opsResponse = await addParameter({
      customer: customerData,
      date: appointMentData?.date,
      time: appointMentData?.time,
      referredBy: appointMentData?.referredBy,
      assignedTo: appointMentData?.assignedTo,
      status: appointMentData?.status,
      comments: appointMentData?.comments,
    });
    dispatch(addSingle(opsResponse?.data));

    const dataResponse = await getAllParameters();
    dispatch(getAll(dataResponse));
    dispatch(
      showAlert({
        title: opsResponse?.message,
        description: opsResponse?.description,
        severity: opsResponse?.severity,
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

// export const addCustomer = (data) => async (dispatch) => {
//   dispatch(clearAlert());

//   try {
//     dispatch(setLoading(true));
//     const opsResponse = await addParameter(data);
//     dispatch(addSingle(opsResponse?.data));
//     const dataResponse = await getAllParameters();
//     dispatch(getAll(dataResponse));
//     dispatch(
//       showAlert({
//         title: opsResponse?.message,
//         description: opsResponse?.description,
//         severity: opsResponse?.severity,
//       })
//     );
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setLoading(false));
//     if (error.response) {
//       dispatch(
//         showAlert({
//           title: error?.response?.data?.message,
//           description: error?.response?.data?.description,
//           severity: error?.response?.data?.severity,
//         })
//       );
//     }
//   }
// };

// export const updateCustomer = (id, data) => async (dispatch) => {
//   dispatch(clearAlert());

//   try {
//     dispatch(setLoading(true));
//     const response = await updateParameter(id, data);
//     dispatch(updateSingle(response?.data));
//     dispatch(
//       showAlert({
//         title: response?.message,
//         description: response?.description,
//         severity: response?.severity,
//       })
//     );
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setLoading(false));
//     if (error.response) {
//       dispatch(
//         showAlert({
//           title: error?.response?.data?.message,
//           description: error?.response?.data?.description,
//           severity: error?.response?.data?.severity,
//         })
//       );
//     }
//   }
// };

// export const deleteCustomer = (id) => async (dispatch) => {
//   dispatch(clearAlert());

//   try {
//     dispatch(setLoading(true));
//     const opsResponse = await deleteParameter(id);
//     dispatch(
//       showAlert({
//         title: opsResponse?.message,
//         description: opsResponse?.description,
//         severity: opsResponse?.severity,
//       })
//     );
//     const dataResponse = await getAllParameters();
//     dispatch(getAll(dataResponse));
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setLoading(false));
//     if (error.response) {
//       dispatch(
//         showAlert({
//           title: error?.response?.data?.message,
//           description: error?.response?.data?.description,
//           severity: error?.response?.data?.severity,
//         })
//       );
//     }
//   }
// };

export default reservationSlice.reducer;
