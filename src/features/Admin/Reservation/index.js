import ReservationCalendar from "./components/ReservationCalendar.component";
import ReservationVenueForm from "./components/ReservationVenueForm.component";
import ReservationDetailConfirm from "./components/ReservationDetailConfirm.component";
import ReservationCustomerForm from "./components/ReservationCustomerForm.component";
import ReservationPackageForm from "./components/ReservationPackageForm.component";
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
  updateReservation,
  // deleteCustomer,
} from "./slices/reservation.slice";

export {
  ReservationCalendar,
  ReservationVenueForm,
  ReservationDetailConfirm,
  ReservationCustomerForm,
  ReservationPackageForm,
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
  updateReservation,
  //   deleteCustomer,
  //   CustomerForm,
};
