// components
import { CustomerTable, CustomerForm } from "./Customer";

// services
import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "./Customer";

// reducers
import {
  customerReducer,
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./Customer";

export {
  CustomerTable,
  CustomerForm,
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
  customerReducer,
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
