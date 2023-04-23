import { clearAlert } from "@/features/Common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getAllUsers, deleteUser } from "@/features/Admin";
import UIDatatable from "@/components/UI/UIDatatable/UIDatatable.component";
import UIAlert from "@/components/UI/UIAlert/UIAlert.component";

const UserTable = () => {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);
  const users = useSelector((state) => state.user);

  const [dataFotmatted, setDataFormatted] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const recordIdentifier = "name";

  const paramIdentifier = {
    name: "User",
    actions: {
      viewParam: {
        active: true,
      },
      editParam: {
        active: true,
      },
      deleteParam: {
        active: true,
        action: deleteUser,
      },
    },
    state: users,
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
      headerName: "User ID",
      showDetail: false,
      hide: true,
    },
    {
      field: "name",
      headerName: "Name",
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
      minWidth: 150,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 150,
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 200,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
    },
    {
      field: "isLoginEnabled",
      headerName: "Login Enabled?",
      minWidth: 150,
      showDetail: true,
      type: "boolean",
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
    },
    {
      field: "managedBy",
      headerName: "ManagedBy By",
      showDetail: true,
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
    status: false,
    comments: false,
    address: false,
    city: false,
    username: false,
    managedBy: false,
    gender: false,
  };

  useEffect(() => {
    dispatch(clearAlert());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const formatData = () => {
      if (users?.allData?.length > 0) {
        const formattedData = users?.allData.map((user, i) => {
          const {
            __v,
            createdAt,
            updatedAt,
            title,
            firstname,
            lastname,
            ...rest
          } = user;

          rest.id = i + 1;
          rest.name = `${firstname} ${lastname}`;

          return rest;
        });
        setDataFormatted(formattedData);
      }
    };

    formatData();
  }, [users]);

  return (
    <Box>
      <UIAlert
        alert={alert}
        showErrorMessage={showErrorMessage}
        setShowErrorMessage={setShowErrorMessage}
      />

      {users && (
        <UIDatatable
          loading={users?.loading}
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

export default UserTable;
