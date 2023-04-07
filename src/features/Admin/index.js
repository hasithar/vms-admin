// components
import { CustomerTable } from "./Customer";

// services
import { fetchAll, deleteSingle } from "./Customer";

// reducers
import { customerReducer, getAllCustomers, deleteCustomer } from "./Customer";

export {
  CustomerTable,
  fetchAll,
  deleteSingle,
  customerReducer,
  getAllCustomers,
  deleteCustomer,
};
