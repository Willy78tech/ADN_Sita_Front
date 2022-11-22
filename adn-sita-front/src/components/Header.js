import * as React from "react";
import { MenuAvatar } from "./MenuAvatar";
import { InputSearch } from "./InputSearch";
import { Sidebar } from "./BurgerMenu";
import { Logout } from "./Logout";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export function Header() {
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    // Trouver un meilleur moyen de cacher le boutton logout ***************************************************
    if (sessionStorage.getItem("token")) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [connected]);

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {connected ? <Logout /> : null}
            <MenuAvatar />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
