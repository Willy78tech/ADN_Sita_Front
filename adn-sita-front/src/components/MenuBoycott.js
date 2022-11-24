import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function MenuBoycott({ boycottId, reported }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [creator, setCreator] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(
        "http://localhost:3000/get-user/" + sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.user.isAdmin === true) {
          setAdmin(true);
          console.log(reported)
          toast.success("Is Admin For Menu");
        } else {
          toast.success("Is Not Admin For Menu");
        }
      })
      .catch((error) => {
        toast.error("Admin Check Error");
      });
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleReport() {
    axios
      .post("http://localhost:3000/report-boycott/" + boycottId, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Boycott Reported");
      })
      .catch((error) => {
        toast.error("Boycott Not Reported");
      });
  }

  function handleUnreport() {
    axios
      .delete("http://localhost:3000/clear-reports/" + boycottId, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Boycott Unreported");
      })
      .catch((error) => {
        toast.error("Boycott Not Unreported");
      });
  }

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
        {admin && reported ? (
          <MenuItem onClick={handleUnreport}>Unreport</MenuItem>
        ) : null}
        {admin || creator ? (
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        ) : null}
        {creator ? <MenuItem onClick={handleClose}>Modify</MenuItem> : null}
        {!admin && !creator && !reported? (
          <MenuItem onClick={handleReport}>Report</MenuItem>
        ) : null}
        <MenuItem onClick={handleClose}>See Boycotters</MenuItem>
      </Menu>
    </div>
  );
}
