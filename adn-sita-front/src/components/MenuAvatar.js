import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Connexion } from "./Connexion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export function MenuAvatar() {
  const [open, setOpen] = React.useState(false);
  const [openSubs, setOpenSubs] = React.useState(false);
  
  
 

  const handleClickOpenConnexion = () => {
    setOpen(true);
    setOpenSubs(false);
  };

  const handleClickCloseConnexion = () => {
    setOpen(false);
  };

  const handleClickCloseSubscribe = () => {
    setOpenSubs(false);
  };

  const handleSubscribe = () => {
    setOpen(false);
    setOpenSubs(false);
    axios.post("http://localhost:3000/signup", {
      pseudo: document.getElementById("pseudoSub").value,
      email: document.getElementById("emailSub").value,
      password: document.getElementById("passwordSub").value,
      confirmPassword: document.getElementById("confirmPasswordSub").value,
      country: document.getElementById("countrySub").value,
      city: document.getElementById("citySub").value,
      quote: document.getElementById("quoteSub").value,

    })
    .then(response => {
      console.log(response);
      toast.success("Vous êtes bien inscrit !")
    })
    
  };

  const handleConnexion = () => {
    // route pour se connecter
    setOpen(false);
    setOpenSubs(false);
    axios.post("http://localhost:3000/login", {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
  }
      )
    .then(response => {
      console.log(response);
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        toast.success("Vous êtes connecté");
      } else {
        toast.error("Erreur de connexion");
      } 
    })
  };


  return (
    <div>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClickOpenConnexion}
        >
          <AccountCircle sx={{ fontSize: "8vh" }} />
        </IconButton>
        <Dialog open={open} onClose={handleClickCloseConnexion} >
          <DialogTitle>Connexion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your account information here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubscribe}
              sx={{ textDecoration: "underline", fontSize: "0.75rem" }}
            >
              No Account?
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleClickCloseConnexion}>Cancel</Button>
            <Button onClick={handleConnexion}>Connect</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openSubs} onClose={handleClickCloseSubscribe}>
          <DialogTitle>Subscription</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your new account information here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="pseudoSub"
              label="Pseudo"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="emailSub"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="citySub"
              label="City"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="countrySub"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="quoteSub"
              label="Quote"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="passwordSub"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="confirmPasswordSub"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickOpenConnexion}>Back</Button>
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
