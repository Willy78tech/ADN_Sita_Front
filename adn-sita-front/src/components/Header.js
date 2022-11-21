import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { MenuAvatar } from "./MenuAvatar";
import { useState, useEffect } from "react";
import { InputSearch } from "./InputSearch";
import { Test } from "./Test";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
//import {TemporaryDrawer} from './Drawer';



export function Header() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#272727", padding: "0.5vh" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ fontSize: "6vh", color: "#00b440" }} />
            </IconButton>
            <InputSearch />
          </Box>
          <Test />
          <Box sx={{ display: "flex", alignItems: "center", mr: "15vw" }}>
            <img src="img/logo.png" alt="Logo" height="80vh"></img>
            <Typography
              variant="h1"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                ml: "0.5vw",
                fontSize: "5rem",
              }}
            >
              ADN
            </Typography>
          </Box>
          <Box>
            <MenuAvatar />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

