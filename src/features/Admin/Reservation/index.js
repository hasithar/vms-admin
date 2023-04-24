import ReservationCalendar from "./components/ReservationCalendar.component";
import ReservationVenueForm from "./components/ReservationVenueForm.component";
import ReservationDetailConfirm from "./components/ReservationDetailConfirm.component";
import ReservationCustomerForm from "./components/ReservationCustomerForm.component";
// import CustomerTable from "./components/CustomerTable.component";
// import CustomerForm from "./components/CustomerForm.component";

import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "./services/reservation.service";

import reservationReducer, {
  addReservationNewCustomer,
  addReservationExistingCustomer,
  // getAllCustomers,
  // getCustomer,
  // addCustomer,
  // updateCustomer,
  // deleteCustomer,
} from "./slices/reservation.slice";

export {
  ReservationCalendar,
  ReservationVenueForm,
  ReservationDetailConfirm,
  ReservationCustomerForm,
  //   CustomerTable,
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
  reservationReducer,
  addReservationNewCustomer,
  addReservationExistingCustomer,
  //   getAllCustomers,
  //   getCustomer,
  //   addCustomer,
  //   updateCustomer,
  //   deleteCustomer,
  //   CustomerForm,
};
