// components
import { CustomerTable, CustomerForm } from "./Customer";

// services
import { getAllParameters, addParameter, deleteParameter } from "./Customer";

// reducers
import {
  customerReducer,
  getAllCustomers,
  addCustomer,
  deleteCustomer,
} from "./Customer";

export {
  CustomerTable,
  CustomerForm,
  getAllParameters,
  addParameter,
  deleteParameter,
  customerReducer,
  getAllCustomers,
  addCustomer,
  deleteCustomer,
};
