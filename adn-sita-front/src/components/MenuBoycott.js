import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function MenuBoycott({ boycott, boycottId, reported }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [creator, setCreator] = React.useState(boycott.userId._id == sessionStorage.getItem("userId") ? true : false);

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
          // console.log(reported)
          // toast.success("Is Admin For Menu");
        } else {
          // toast.success("Is Not Admin For Menu");
        }
      })
      .catch((error) => {
        // toast.error("Admin Check Error");
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
      })
      .catch((error) => {
        toast.error("Boycott Not Deleted");
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
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        ) : null}
        {/* {creator ? <MenuItem onClick={handleClose}>Modify</MenuItem> : null} */}
        {!admin && !creator && !reported && sessionStorage.getItem("token") ? (
          <MenuItem onClick={handleReport}>Report</MenuItem>
        ) : null}
        {(!admin && !creator && reported) || !sessionStorage.getItem("token") ? <MenuItem onClick={handleClose}>No option...</MenuItem> : null}
      </Menu>
    </div>
  );
}
