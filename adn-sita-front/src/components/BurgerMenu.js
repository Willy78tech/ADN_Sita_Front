import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Box,
  ListItemIcon,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";

export function BurgerMenu() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ left: false });
  const [admin, setAdmin] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("/get-user/" + sessionStorage.getItem("userId"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.user.isAdmin === true) {
          setAdmin(true);
          toast.success("Is Admin");
        } else {
          setAdmin(false);
          toast.success("Is Not Admin");
        }
      })
      .catch((error) => {
        toast.error("Admin Check Error");
      });
  }, []);

  const itemslist = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onclick: () => navigate("/"),
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      onclick: () => navigate("profile"),
    },
    {
      text: "Users",
      icon: <GroupIcon />,
      onclick: () => navigate("users"),
    },
    {
      text: "CreateBoycott",
      icon: <CreateIcon />,
      onclick: () => navigate("createBoycott"),
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon sx={{ fontSize: "6vh", color: "#00b440" }} />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <List open={open}>
            {itemslist.map((item, index) => {
              const { text, icon, onclick } = item;
              return (
                <ListItemButton key={text} onClick={onclick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              );
            })}
            {admin ? (
              <ListItemButton onClick={() => navigate("admin")}>
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary={"Admin"} />
              </ListItemButton>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
