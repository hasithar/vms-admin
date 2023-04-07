import CustomerTable from "./components/CustomerTable.component";
import CustomerForm from "./components/CustomerForm.component";

import {
  getAllParameters,
  addParameter,
  deleteParameter,
} from "./services/customer.service";

import customerReducer, {
  getAllCustomers,
  addCustomer,
  deleteCustomer,
} from "./slices/customer.slice";

export {
  CustomerTable,
  getAllParameters,
  addParameter,
  deleteParameter,
  customerReducer,
  getAllCustomers,
  addCustomer,
  deleteCustomer,
  CustomerForm,
};
