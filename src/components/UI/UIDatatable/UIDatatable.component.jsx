import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RowActions from "./RowActions/RowActions.component";
import ViewRecordDialog from "./ViewRecordDialog/ViewRecordDialog.component";
import DeleteDialog from "./DeleteDialog/DeleteDialog.component";

const UIDatatable = (props) => {
  const {
    loading,
    rows,
    columns,
    columnVisibilityModel,
    recordIdentifier,
    paramIdentifier,
  } = props;

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
      const { viewParam, editParam, deleteParam } = paramIdentifier?.actions;

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
            navigate(`./${params?.row?._id}/edit`, {
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
              active: viewParam?.active,
            },
            {
              label: "Edit",
              action: actionEdit,
              active: editParam?.active,
            },
            {
              label: "Delete",
              action: actionDelete,
              active: deleteParam?.active,
            },
          ];

          return <RowActions row={params.row} options={options} />;
        },
      });

      setColumnsFormatted(c);
    };

    updateColumns();
  }, [columns, navigate, paramIdentifier?.actions]);

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
            pageSizeOptions={[10, 25, 50, 100]}
          />
        )
      )}

      <ViewRecordDialog
        record={currentRecord}
        viewDialogOpen={viewDialogOpen}
        handleViewDialog={handleViewDialog}
        columns={columns}
        recordIdentifier={recordIdentifier}
      />

      <DeleteDialog
        record={currentRecord}
        deleteDialogOpen={deleteDialogOpen}
        handleDeleteDialog={handleDeleteDialog}
        recordIdentifier={recordIdentifier}
        paramIdentifier={paramIdentifier}
      />
    </Box>
  );
};

export default UIDatatable;
