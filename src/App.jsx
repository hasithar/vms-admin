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
import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import ProtectedAdminRoute from "./features/Auth/components/ProtectedAdminRoute/ProtectedAdminRoute";

import PortalAuth from "./pages/Auth/PortalAuth";
import PortalLogin from "./pages/Auth/Login/PortalLogin";
import ProtectedPortalRoute from "./features/Auth/components/ProtectedPortalRoute/ProtectedPortalRoute";

/*
 * ----------------------------------------
 * Route group - Admin
 * ----------------------------------------
 */

// Dashboard
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";

// Parameter Management
import ParameterManagement from "./pages/Admin/ParameterManagement/ParameterManagement";
import ParameterAdd from "./pages/Admin/ParameterManagement/ParameterAdd/ParameterAdd";
import ParameterEdit from "./pages/Admin/ParameterManagement/ParameterEdit/ParameterEdit";
import ParameterList from "./pages/Admin/ParameterManagement/ParameterList/ParameterList";

// Customers
import CustomerAdd from "./pages/Admin/CustomerManagement/CustomerAdd/CustomerAdd";
import CustomerEdit from "./pages/Admin/CustomerManagement/CustomerEdit/CustomerEdit";
import CustomerList from "./pages/Admin/CustomerManagement/CustomerList/CustomerList";

// Users
import UserAdd from "./pages/Admin/UserManagement/UserAdd/UserAdd";
import UserEdit from "./pages/Admin/UserManagement/UserEdit/UserEdit";
import UserList from "./pages/Admin/UserManagement/UserList/UserList";

// Reservations
import ReservationList from "./pages/Admin/Reservations/ReservationList/ReservationList";
import ReservationAdd from "./pages/Admin/Reservations/ReservationAdd/ReservationAdd";

// Appointments
import AppointmentList from "./pages/Admin/Appointments/AppointmentList/AppointmentList";
import AppointmentAdd from "./pages/Admin/Appointments/AppointmentAdd/AppointmentAdd";

// Invoices
import Invoices from "./pages/Admin/Invoices/Invoices";

// Suppliers
import Suppliers from "./pages/Admin/Suppliers/Suppliers";

// Inventory
import Inventory from "./pages/Admin/Inventory/Inventory";

/*
 * ----------------------------------------
 * Route group - Portal
 * ----------------------------------------
 */

// Dashboard
import PortalDashboard from "./pages/Portal/Dashboard/Dashboard";
// Package
import PortalPackage from "./pages/Portal/Package/Package";
// Menu
import PortalMenu from "./pages/Portal/Menu/Menu";
// Function plan
import PortalFunctionPlan from "./pages/Portal/FunctionPlan/FunctionPlan";
// Floor plan
import PortalFloorPlan from "./pages/Portal/FloorPlan/FloorPlan";
// Decoration
import PortalDecorations from "./pages/Portal/Decorations/Decorations";
// Guest List
import PortalGuestList from "./pages/Portal/GuestList/GuestList";

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

          {/* Customer Auth */}
          <Route path="/" element={<PortalAuth />}>
            <Route path="login" element={<PortalLogin />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/parameters">
              <Route index element={<ParameterManagement />} />

              <Route path=":parameter">
                <Route index element={<ParameterList />} />
                <Route
                  path="/admin/parameters/:parameter/add"
                  element={<ParameterAdd />}
                />
                <Route
                  path="/admin/parameters/:parameter/:id/edit"
                  element={<ParameterEdit />}
                />
              </Route>
            </Route>

            <Route path="/admin/customers">
              <Route index element={<CustomerList />} />
              <Route path="/admin/customers/add" element={<CustomerAdd />} />
              <Route
                path="/admin/customers/:id/edit"
                element={<CustomerEdit />}
              />
            </Route>

            <Route path="/admin/users">
              <Route index element={<UserList />} />
              <Route path="/admin/users/add" element={<UserAdd />} />
              <Route path="/admin/users/:id/edit" element={<UserEdit />} />
            </Route>

            <Route path="/admin/reservations">
              <Route index element={<ReservationList />} />
              <Route
                path="/admin/reservations/add"
                element={<ReservationAdd />}
              />
              {/* <Route
                path="/admin/reservations/:id/edit"
                element={<CustomerEdit />}
              /> */}
            </Route>

            <Route path="/admin/appointments">
              <Route index element={<AppointmentList />} />
              <Route
                path="/admin/appointments/add"
                element={<AppointmentAdd />}
              />
              {/*  <Route
                path="/admin/appointments/:id/edit"
                element={<CustomerEdit />}
              /> */}
            </Route>

            <Route path="/admin/invoices" element={<Invoices />} />

            <Route path="/admin/suppliers" element={<Suppliers />} />

            <Route path="/admin/inventory" element={<Inventory />} />
          </Route>

          {/* Portal */}
          <Route path="/portal" element={<ProtectedPortalRoute />}>
            <Route path="/portal/dashboard" element={<PortalDashboard />} />
            <Route path="/portal/package" element={<PortalPackage />} />
            <Route path="/portal/menu" element={<PortalMenu />} />
            <Route
              path="/portal/function-plan"
              element={<PortalFunctionPlan />}
            />
            <Route path="/portal/floor-plan" element={<PortalFloorPlan />} />
            <Route path="/portal/decoration" element={<PortalDecorations />} />
            <Route path="/portal/guest-list" element={<PortalGuestList />} />
          </Route>

          {/* Not found */}
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* open routes 
            <Route path="/quotation/:id/accept" element={<AcceptQuotation />} /> 
          {*/}
        </Routes>
      </BrowserRouter>
    </Paper>
  );
};

export default App;
