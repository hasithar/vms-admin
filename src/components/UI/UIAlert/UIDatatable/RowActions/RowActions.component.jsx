import React from "react";
import {
  Button,
  ButtonGroup,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
} from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

const RowActions = (props) => {
  const { row, options } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef} size="small">
        <Button onClick={options[0].action}>{options[0].label}</Button>
        <Button onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        // disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map(
                    (option, index) =>
                      index > 0 &&
                      option.active && (
                        <MenuItem
                          key={`option${index}`}
                          onClick={(event) => {
                            option.action();
                            setOpen(false);
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default RowActions;
