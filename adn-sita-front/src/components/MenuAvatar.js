import React from "react";
import { Connexion } from "./Connexion";
import { IconButton, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export function MenuAvatar() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <AccountCircle sx={{ fontSize: "8vh" }} />
        </IconButton>
        <Connexion openConnexion={open} />
      </Box>
    </div>
  );
}
