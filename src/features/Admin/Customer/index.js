import CustomerTable from "./components/CustomerTable.component";

import { fetchAll, deleteSingle } from "./services/customer.service";

import customerReducer, {
  getAllCustomers,
  deleteCustomer,
} from "./slices/customer.slice";

export {
  CustomerTable,
  fetchAll,
  deleteSingle,
  customerReducer,
  getAllCustomers,
  deleteCustomer,
};
