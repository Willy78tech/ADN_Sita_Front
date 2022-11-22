import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function MenuBoycott() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [creator, setCreator] = React.useState(false);
  const [reported, setreported] = React.useState(false);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleMenu}>
        <MoreVertIcon color="white" sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {admin && reported ? <MenuItem onClick={handleClose}>Unreport</MenuItem> : null}
        {admin || creator ? <MenuItem onClick={handleClose}>Delete</MenuItem> : null}
        {creator ? <MenuItem onClick={handleClose}>Modify</MenuItem> : null}
        {!admin && !creator ? <MenuItem onClick={handleClose}>Report</MenuItem> : null}
        <MenuItem onClick={handleClose}>See Boycotters</MenuItem>
      </Menu>
    </div>
  );
}
