import React, { useState, useEffect } from "react";
import { Switch, Case, Default } from "react-if";
import {
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewRecordDialog = (props) => {
  const {
    record,
    viewDialogOpen,
    handleViewDialog,
    columns,
    recordIdentifier,
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateOpen = () => {
      setOpen(viewDialogOpen);
    };

    updateOpen();
  }, [viewDialogOpen]);

  const handleClose = () => {
    // setOpen(false);
    handleViewDialog(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} color="secondary" sx={{ position: "relative" }}>
          <Toolbar sx={{ px: { sm: 2 } }} color="primary">
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              {record && record[recordIdentifier]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          {record &&
            Object.entries(record).map(([key, value], i) => {
              const r = columns.filter((column) => {
                return column.field === key;
              });

              return !r[0]?.hide || r[0]?.showDetail ? (
                <div key={r[0]?.headerName}>
                  <ListItem>
                    <Switch>
                      <Case condition={r[0]?.headerName === "Status"}>
                        <ListItemText
                          primary={r[0]?.headerName}
                          secondary={
                            <Typography color="secondary" variant="body2">
                              {<>{value === 1 ? "Active" : "Deactive"}</>}
                            </Typography>
                          }
                        />
                      </Case>
                      <Case condition={r[0]?.type === "boolean"}>
                        <ListItemText
                          primary={r[0]?.headerName}
                          secondary={
                            <Typography color="secondary" variant="body2">
                              {<>{value === true ? "Yes" : "No"}</>}
                            </Typography>
                          }
                        />
                      </Case>
                      <Case condition={r[0]?.type === "object"}>
                        <ListItemText
                          primary={r[0]?.headerName}
                          secondary={
                            <Typography color="secondary" variant="body2">
                              {
                                <>
                                  {value && value[r[0].detailKey]
                                    ? value[r[0].detailKey]
                                    : "-"}
                                </>
                              }
                            </Typography>
                          }
                        />
                      </Case>
                      <Default>
                        <ListItemText
                          primary={r[0]?.headerName}
                          secondary={
                            <Typography color="secondary" variant="body2">
                              {<>{value ? value : "-"}</>}
                            </Typography>
                          }
                        />
                      </Default>
                    </Switch>
                  </ListItem>
                  <Divider />
                </div>
              ) : null;
            })}

          <Divider />
        </List>
      </Dialog>
    </div>
  );
};

export default ViewRecordDialog;
