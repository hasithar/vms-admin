import { clearAlert } from "@/features/Common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getAllCustomers, deleteCustomer } from "@/features/Admin";
import UIDatatable from "@/components/UI/UIDatatable/UIDatatable.component";
import UIAlert from "@/components/UI/UIAlert/UIAlert.component";

const CustomerTable = () => {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);
  const customers = useSelector((state) => state.customer);

  const [dataFotmatted, setDataFormatted] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const recordIdentifier = "name";

  const paramIdentifier = {
    name: "Customer",
    actions: {
      viewParam: {
        active: true,
      },
      editParam: {
        active: true,
      },
      deleteParam: {
        active: true,
        action: deleteCustomer,
      },
    },
    state: customers,
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 50,
      showDetail: false,
      hide: true,
    },
    {
      field: "_id",
      headerName: "Customer ID",
      showDetail: false,
      hide: true,
    },
    {
      field: "name",
      headerName: "Customer Name",
      minWidth: 200,
      flex: 1,
      hide: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 200,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 200,
    },
    {
      field: "referredBy",
      headerName: "Referred By",
      showDetail: true,
      type: "object",
      detailKey: "name",
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      showDetail: true,
      type: "object",
      detailKey: "name",
    },
    {
      field: "status",
      headerName: "Status",
      showDetail: false,
      hide: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      showDetail: true,
    },
  ];

  const columnVisibilityModel = {
    _id: false,
    createdAt: false,
    updatedAt: false,
    referredBy: false,
    assignedTo: false,
    status: false,
    comments: false,
  };

  useEffect(() => {
    dispatch(clearAlert());
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    const formatData = () => {
      if (customers?.allData?.length > 0) {
        const formattedData = customers?.allData.map((customer, i) => {
          const {
            __v,
            createdAt,
            updatedAt,
            title,
            firstname,
            lastname,
            ...rest
          } = customer;

          rest.id = i + 1;
          rest.name = `${title}. ${firstname} ${lastname}`;

          return rest;
        });
        setDataFormatted(formattedData);
      }
    };

    formatData();
  }, [customers]);

  return (
    <Box>
      <UIAlert
        alert={alert}
        showErrorMessage={showErrorMessage}
        setShowErrorMessage={setShowErrorMessage}
      />

      {customers && (
        <UIDatatable
          loading={customers?.loading}
          rows={dataFotmatted}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          recordIdentifier={recordIdentifier}
          paramIdentifier={paramIdentifier}
        />
      )}
    </Box>
  );
};

export default CustomerTable;
