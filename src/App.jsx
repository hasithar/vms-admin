import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { history } from "./helpers";
// import { alertActions } from "./actions";
import Paper from "@mui/material/Paper";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

/*
 * ----------------------------------------
 * Route group - Auth
 * ----------------------------------------
 */

// Auth
import Auth from './pages/Auth/Auth';
import Login from './pages/Auth/Login/Login';
import ProtectedAdminRoute from "./features/Auth/components/ProtectedAdminRoute/ProtectedAdminRoute";

/*
 * ----------------------------------------
 * Route group - Admin
 * ----------------------------------------
 */

// Dashboard
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';

// Parameter Management
import ParameterManagement from './pages/Admin/ParameterManagement/ParameterManagement';
import ParameterAdd from './pages/Admin/ParameterManagement/ParameterAdd/ParameterAdd';
import ParameterEdit from './pages/Admin/ParameterManagement/ParameterEdit/ParameterEdit';
import ParameterList from './pages/Admin/ParameterManagement/ParameterList/ParameterList';

// Customers
import CustomerAdd from "./pages/Admin/CustomerManagement/CustomerAdd/CustomerAdd";
import CustomerEdit from "./pages/Admin/CustomerManagement/CustomerEdit/CustomerEdit";
import CustomerList from "./pages/Admin/CustomerManagement/CustomerList/CustomerList";

// Reservations
import Reservations from './pages/Admin/Reservations/Reservations';

// Appointments
import Appointments from './pages/Admin/Appointments/Appointments';

// Invoices
import Invoices from './pages/Admin/Invoices/Invoices';

// Suppliers
import Suppliers from './pages/Admin/Suppliers/Suppliers';

// Inventory
import Inventory from './pages/Admin/Inventory/Inventory';

const App = (props) => {
  // const dispatch = useDispatch();

  // history.listen((location, action) => {
  //   dispatch(alertActions.clear());
  // });

  return (
      <Paper className="App" elevation={0}>
        <BrowserRouter>
        <Routes>
            {/* Auth */}
            <Route path="auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              <Route path="/admin/parameter-management">
                <Route index element={<ParameterManagement />} />

                <Route path=":parameter">
                  <Route index element={<ParameterList />} />
                  <Route
                    path="/admin/parameter-management/:parameter/add"
                    element={<ParameterAdd />}
                  />
                  <Route
                    path="/admin/parameter-management/:parameter/:id/edit"
                    element={<ParameterEdit />}
                  />
                </Route>
              </Route>

              <Route path="/admin/customer-management">
                <Route index element={<CustomerList />} />
                <Route
                  path="/admin/customer-management/add"
                  element={<CustomerAdd />}
                />
                <Route
                  path="/admin/customer-management/:id/edit"
                  element={<CustomerEdit />}
                />
              </Route>

              <Route path="/admin/reservations" element={<Reservations />} />

              <Route path="/admin/appointments" element={<Appointments />} />

              <Route path="/admin/invoices" element={<Invoices />} />

              <Route path="/admin/suppliers" element={<Suppliers />} />

              <Route path="/admin/inventory" element={<Inventory />} />
            </Route>

             {/* Not found */}
             {/* <Route path="*" element={<NotFound />} /> */}



            {/* customer login
            <Route path="/login" element={<Auth />}>
              <Route index element={<CustomerLogin />} />
            </Route>

            {/* Customer 
            <Route path="/" element={<ProtectedCustomerRoute />}>
              <Route path="/dashboard" element={<CustomerDashboard />} />

              <Route path="/store">
                <Route index element={<CustomerStore />} />

                <Route path=":itemId" element={<CustomerStoreItem />} />
                <Route path="/store/cart">
                  <Route index element={<CustomerStoreCart />} />
                  <Route
                    path="/store/cart/success"
                    element={<CustomerStoreCheckoutSuccess />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Admin 
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              
              <Route path="/admin/customer-management/roles">
                  <Route index element={<RoleList />} />
                  <Route
                    path="/admin/customer-management/roles/add"
                    element={<RoleAdd />}
                  />
                  <Route
                    path="/admin/customer-management/roles/:id/edit"
                    element={<RoleEdit />}
                  />
                </Route>


              

              <Route path="/admin/profile" element={<ProfileEdit />} />

              <Route path="/admin/organization-management">
                <Route index element={<OrganizationList />} />
                <Route
                  path="/admin/organization-management/add"
                  element={<OrganizationAdd />}
                />
                <Route
                  path="/admin/organization-management/:id/edit"
                  element={<OrganizationEdit />}
                />
              </Route>

              <Route path="/admin/quotation" element={<QuotationPage />} />

              <Route path="/admin/quotations" element={<QuotationsComponent />} />

              <Route path="/admin/quotation/:id" element={<EditQuotation/>} />

              <Route
                path="/admin/quotation/:id/:admin"
                element={<AcceptQuotation />}
              />

              <Route path="/admin/priceBook" element={<PriceBookContainer />} />

              <Route path="/admin/production-orders" >
                <Route index element={<ProductionOrder />} />
                <Route path=":id/:view" element={<ProductionOrderView />} />
              </Route>

              <Route 
                path="/admin/production-orders/:proceededProductionOrder" 
                element={<ProductionOrder />}
              >
              </Route>

              <Route path="/admin/invoices">
                <Route index element={<InvoicesComponent/>} />
                <Route path=":id" element={<InvoiceContainer />} />
                <Route path=":id/:view" element={<ViewInvoiceContainer />} />
              </Route>

              <Route path="/admin/payments" element={<PaymentManagementContainer />} />

              <Route 
                path="/admin/invoice/:id/:customer"
                element={<InvoiceContainer />}
              >
              </Route>

              <Route
                path="/admin/sales-orders"
                element={<SalesOrdersContainer />}
              />
              <Route
                path="/admin/sales-orders/:id/:view"
                element={<SalesOrderPage />}
              />
              <Route
                path="/admin/sales-orders/:id"
                element={<SalesOrderPage />}
              />
              <Route
                path="/admin/sales-orders/customer/:id"
                element={<SalesOrderCustomer />}
              />

              <Route
                path="/admin/sales-order/proceed/:id"
                element={<SalesOrderProceedComponent />}
              />
            </Route>

            {/* open routes 
            <Route path="/quotation/:id/accept" element={<AcceptQuotation />} /> 
{*/}

           
          </Routes>
        </BrowserRouter>
      </Paper>
  );
};

export default App;
