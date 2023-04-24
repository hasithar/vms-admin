import AppointmentCalendar from "./components/AppointmentCalendar.component";
import AppointmentForm from "./components/AppointmentForm.component";
// import CustomerTable from "./components/CustomerTable.component";
// import CustomerForm from "./components/CustomerForm.component";

import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "./services/appointment.service";

import appointmentReducer, {
  addAppointmentNewCustomer,
  // getAllCustomers,
  // getCustomer,
  // addCustomer,
  // updateCustomer,
  // deleteCustomer,
} from "./slices/appointment.slice";

export {
  AppointmentCalendar,
  AppointmentForm,
  //   CustomerTable,
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
  appointmentReducer,
  addAppointmentNewCustomer,
  //   getAllCustomers,
  //   getCustomer,
  //   addCustomer,
  //   updateCustomer,
  //   deleteCustomer,
  //   CustomerForm,
};
