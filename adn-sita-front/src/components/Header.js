import * as React from "react";
import { MenuAvatar } from "./MenuAvatar";
import { InputSearch } from "./InputSearch";
import { Sidebar } from "./BurgerMenu";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#272727", padding: "0.5vh" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Sidebar />
            <InputSearch />
          </Box>
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
