import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function MenuBoycott({ boycott, boycottId, reports }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [creator, setCreator] = React.useState(boycott.userId._id == sessionStorage.getItem("userId") ? true : false);
  const [reported, setReported] = React.useState(boycott.reports.includes(sessionStorage.getItem("userId")) ? true : false);


  React.useEffect(() => {
    console.log(creator)
    axios
      .get(
        "/get-user/" + sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.user.isAdmin === true) {
          setAdmin(true);
        }
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
      .post("/report-boycott/" + boycottId, {}, {
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
      window.location.reload();
  }

  function handleUnreport() {
    axios
      .delete("/clear-reports/" + boycottId, {
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
      window.location.reload();
  }

  function handleDelete() {
    axios
      .delete("/delete-boycott/" + boycottId, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Boycott Deleted");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Boycott Not Deleted");
      });
      window.location.reload();
  }
  console.log(handleReport.length)
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
        {admin && boycott.isReport ? (
          <MenuItem sx={{color: "red", cursor: "default"}}>{reports} report</MenuItem>
        ) : null}
        {admin && boycott.isReport ? (
          <MenuItem onClick={handleUnreport}>Unreport</MenuItem>
        ) : null}
        {admin || creator ? (
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        ) : null}
        {!admin && !creator && !reported && sessionStorage.getItem("token") ? (
          <MenuItem onClick={handleReport}>Report</MenuItem>
        ) : null}
        {(!admin && !creator && reported) || !sessionStorage.getItem("token") ? <MenuItem onClick={handleClose}>No option...</MenuItem> : null}
      </Menu>
    </div>
  );
}
