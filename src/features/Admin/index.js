// components
import { CustomerTable, CustomerForm } from "./Customer";
import { UserTable, UserForm } from "./User";
import { ParameterCard } from "./Parameter";
import { AppointmentCalendar } from "./Appointment";
import { ReservationCalendar } from "./Reservation";

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
  // appointments
  AppointmentCalendar,
  // reservations
  ReservationCalendar,
};
