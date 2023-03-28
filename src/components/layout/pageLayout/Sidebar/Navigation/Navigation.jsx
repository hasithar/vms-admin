import React, { useMemo, forwardRef, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// import { checkPermission } from "../../../../../helpers/helpers";

import styles from "./Navigation.module.scss";

const ListItemLink = (props) => {
  const { primary, to, mode } = props;

  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li style={{ paddingLeft: mode === "sub" ? "1rem" : 0 }}>
      <ListItem button component={renderLink}>
        {/* {icon ? <SvgIcon>{icon}</SvgIcon> : null} */}
        <ListItemText primary={primary} className={styles.navlink} />
      </ListItem>
    </li>
  );
};

const Navigation = () => {
  const [openSettings, setOpenSettings] = useState(false);

  // const [open, setOpen] = React.useState(false);
  // const showAllQuotation = checkPermission("View All Quotations");
  // const showAllSalesOrders = checkPermission("View All Sales Orders");
  // const showViewAllInvoice = checkPermission("View All Invoices");
  // const showViewAllProductionOrder = checkPermission(
  //   "View All Production Orders"
  // );
  // const showPriceBook = checkPermission("View All Pricebook Records");
  // const showOrganization = checkPermission("View All Organizations");
  // const showRoleManagement = checkPermission("Manage Roles");

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  // const handleClickPo = () => {
  //   setOpenPO(!openPO);
  // };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, color: "#fff" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={styles.navlist}
    >
      <ListItemLink to="/admin/dashboard" primary="Dashboard" />

      <ListItemLink to="/admin/appointments" primary="Appointments" />

      <ListItemLink to="/admin/inventory" primary="Inventory" />

      <ListItemLink to="/admin/invoices" primary="Invoices" />

      <ListItemLink to="/admin/reservations" primary="Reservations" />

      <ListItemLink to="/admin/suppliers" primary="Suppliers" />

      <ListItemLink
        to="/admin/parameter-management"
        primary="Parameter Management"
      />

      <Divider light sx={{ borderColor: "#fff", opacity: 0.1 }} />

      <ListItemButton onClick={handleSettingsClick}>
        <ListItemText primary="Settings" />
        {openSettings ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSettings} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Billing" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Shipping" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default Navigation;
