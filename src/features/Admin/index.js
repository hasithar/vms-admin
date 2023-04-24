// components
import { CustomerTable, CustomerForm } from "./Customer";
import { UserTable, UserForm } from "./User";
import { ParameterCard } from "./Parameter";
import { AppointmentCalendar, AppointmentForm } from "./Appointment";
import {
  ReservationCalendar,
  ReservationVenueForm,
  ReservationDetailConfirm,
} from "./Reservation";
import { ParameterTable } from "./Parameter";

// reducers
import {
  customerReducer,
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./Customer";

import {
  userReducer,
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "./User";

import { appointmentReducer, addAppointmentNewCustomer } from "./Appointment";

export {
  // customer
  CustomerTable,
  CustomerForm,
  customerReducer,
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  // user
  UserTable,
  UserForm,
  userReducer,
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  // parameter
  ParameterCard,
  ParameterTable,
  // appointments
  AppointmentCalendar,
  AppointmentForm,
  appointmentReducer,
  addAppointmentNewCustomer,
  // reservations
  ReservationCalendar,
  ReservationVenueForm,
  ReservationDetailConfirm,
};
