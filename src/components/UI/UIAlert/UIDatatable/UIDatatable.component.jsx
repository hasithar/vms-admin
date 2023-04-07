import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RowActions from "./RowActions/RowActions.component";
import ViewRecordDialog from "./ViewRecordDialog/ViewRecordDialog.component";

const UIDatatable = (props) => {
  const { loading, rows, columns, columnVisibilityModel, recordIdentifier } =
    props;

  const navigate = useNavigate();

  const [columnsFormatted, setColumnsFormatted] = useState();
  const [currentRecord, setCurrentRecord] = useState();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleViewDialog = (response) => {
    setViewDialogOpen(response);
  };

  const handleDeleteDialog = (response) => {
    setDeleteDialogOpen(response);
  };

  useEffect(() => {
    const updateColumns = () => {
      const c = [];

      columns.map((column, i) => c.push(columns[i]));
      c.push({
        field: "row_actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        disableClickEventBubbling: true,

        renderCell: (params) => {
          const actionView = (e) => {
            setCurrentRecord(params.row);
            handleViewDialog(true);
          };

          const actionEdit = (e) => {
            setCurrentRecord(params.row);
            navigate(`./${params?.row?.id}/edit`, {
              state: {
                param: params.row,
                mode: "edit",
              },
            });
          };

          const actionDelete = (e) => {
            setCurrentRecord(params.row);
            handleDeleteDialog(true);
          };

          const options = [
            {
              label: "View",
              action: actionView,
            },
            {
              label: "Edit",
              action: actionEdit,
            },
            {
              label: "Delete",
              action: actionDelete,
            },
          ];

          return <RowActions row={params.row} options={options} />;
        },
      });

      setColumnsFormatted(c);
    };

    updateColumns();
  }, [columns]);

  return (
    <Box>
      {loading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 3, pb: 6 }}
        >
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        rows &&
        columnsFormatted && (
          <DataGrid
            rows={rows}
            columns={columnsFormatted}
            columnVisibilityModel={columnVisibilityModel}
            autoHeight={true}
            onCellClick={(e) => e.stopPropagation}
            paginationMode="client"
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}

            // getRowId={(row) => row?._id}
            // rowsPerPageOptions={[5]}
            // pagination
            // rowCount={rows?.length}
          />
        )
      )}

      <ViewRecordDialog
        record={currentRecord}
        viewDialogOpen={viewDialogOpen}
        handleViewDialog={handleViewDialog}
        columns={columns}
        recordIdentifier={recordIdentifier}
        // recordType={recordType}
      />

      {/* <DeleteDialog
        record={currentRecord}
        deleteDialogOpen={deleteDialogOpen}
        handleDeleteDialog={handleDeleteDialog}
        recordIdentifier={recordIdentifier}
        columns={columns}
        actionIdentifier={actionIdentifier}
      /> */}
    </Box>
  );
};

export default UIDatatable;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { Box, CircularProgress, Stack } from "@mui/material";

// import ViewRecordDialog from "./ViewRecordDialog/ViewRecordDialog.component";
// import DeleteDialog from "./DeleteDialog/DeleteDialog.component";
// import RowActions from "./RowActions/RowActions.component";

// const DataTable = (props) => {
//   const {
//     loading,
//     rows,
//     columns,
//     recordIdentifier,
//     actionIdentifier,
//     recordType,
//     isEnabledView = true,
//     isEnabledEdit = false,
//     isEnabledDelete = true,
//     paginationData = {},
//     handlePageChange,
//   } = props;

//

//   const [page, setPage] = React.useState(0);

//   return (

//   );
// };

// export default DataTable;
