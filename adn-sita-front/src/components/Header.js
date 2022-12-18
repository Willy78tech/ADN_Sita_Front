import * as React from "react";
import { MenuAvatar } from "./MenuAvatar";
import { Search } from "./Search";
import { BurgerMenu } from "./BurgerMenu";
import { Logout } from "./Logout";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export function Header() {
  const [connected, setConnected] = React.useState(
    sessionStorage.getItem("token") ? true : false
  );



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#272727", padding: "0.5vh" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {sessionStorage.getItem("token") ? <BurgerMenu /> : null}
            {/* <Search /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {connected ? <Logout onclick={() => setConnected(false)} /> : null}
            <MenuAvatar />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
