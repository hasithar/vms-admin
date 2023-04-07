import { clearAlert } from "@/features/Common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getAllCustomers, deleteCustomer } from "@/features/Admin";
import UIDatatable from "@/components/UI/UIAlert/UIDatatable/UIDatatable.component";
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
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
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
      if (customers?.data) {
        const formattedData = customers?.data.map((customer, i) => {
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
  }, [customers?.data]);

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
          //           actionIdentifier="organizationActions"
        />
      )}
    </Box>
  );
};

export default CustomerTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box } from "@mui/material";
// import {
//   organizationActions,
//   paymentTermActions,
//   countryActions,
// } from "../../../../actions";
// import DataTable from "../../../common/ui/table/DataTable/DataTable.component";
// import { checkPermission } from "../../../../helpers/helpers";

// const OrganizationTable = () => {
//   const dispatch = useDispatch();
//   const organizations = useSelector((state) => state.organizations);
//   const paymentTerms = useSelector((state) => state.paymentTerms);
//   const countries = useSelector((state) => state.countries);
//   const [dataFotmatted, setDataFormatted] = useState();
//   const isEnabledEdit = checkPermission('Edit Organizations');

//   useEffect(() => {
//     dispatch(organizationActions.getAllParameters());
//     dispatch(paymentTermActions.getAllParameters());
//     dispatch(countryActions.getAllParameters());
//   }, [dispatch]);

//   useEffect(() => {
//     const formatData = () => {
//       if (
//         paymentTerms?.items?.data &&
//         organizations?.items?.data &&
//         countries?.items?.data
//       ) {
//         const formattedData = organizations?.items?.data.map((item) => {
//           const { payment_term_id, country_id, ...rest } = item;
//           const paymentTerm = paymentTerms?.items?.data.filter((term) => {
//             return term.id === payment_term_id;
//           });
//           const country = countries?.items?.data.filter((term) => {
//             return term.id === country_id;
//           });
//           rest.payment_term_id = paymentTerm[0].name;
//           rest.country_id = country[0].name;

//           return rest;
//         });

//         setDataFormatted(formattedData);
//       }
//     };

//     formatData();
//   }, [
//     paymentTerms?.items?.data,
//     organizations?.items?.data,
//     countries?.items?.data,
//   ]);

//   return (
//     <Box>
//       {organizations && (
//         <DataTable
//           loading={organizations?.loading || paymentTerms?.loading}
//           rows={dataFotmatted}
//           columns={columns}
//           recordIdentifier={recordIdentifier}
//           actionIdentifier="organizationActions"
//           isEnabledEdit={isEnabledEdit}
//           isEnabledDelete={false}
//         />
//       )}
//     </Box>
//   );
// };

// export default OrganizationTable;
