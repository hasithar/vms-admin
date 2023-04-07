import CustomerTable from "./components/CustomerTable.component";

import { fetchAll } from "./services/customer.service";

import customerReducer, { getAllCustomers } from "./slices/customer.slice";

export { CustomerTable, fetchAll, customerReducer, getAllCustomers };
