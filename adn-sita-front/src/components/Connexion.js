import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { validEmail } from './regex.js';
import '../App.css';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


export function Connexion({ openConnexion }) {
  const [open, setOpen] = React.useState(false);
  const [openSubs, setOpenSubs] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');
 /*  const validate = () => {
    if (!validEmail.test(email)) {
      setEmailErr(true);
       toast.error("Email is not valid");
    } else {
      setEmailErr(false);
    }
 }; */


  React.useEffect(() => {
    setOpen(openConnexion);
  }, [openConnexion]);

  const handleClickOpenConnexion = () => {
    setOpen(true);
    setOpenSubs(false);
  };

  const handleClickCloseConnexion = () => {
    setOpen(false);
  };

  const handleClickOpenSubscribe = () => {
    setOpenSubs(true);
    setOpen(false);
  };

  const handleClickCloseSubscribe = () => {
    setOpenSubs(false);
  };

  const handleSubscribe = () => {
    setOpenSubs(false);
    if (!validEmail.test(email)) {
      setEmailErr(true);
       toast.error("Email is not valid");
    } else {
      setEmailErr(false);
    }

    axios
      .post("/signup", {
        pseudo: document.getElementById("pseudoSub").value,
        email: document.getElementById("emailSub").value,
        password: document.getElementById("passwordSub").value,
        confirmPassword: document.getElementById("confirmPasswordSub").value,
        country: document.getElementById("countrySub").value,
        city: document.getElementById("citySub").value,
        quote: document.getElementById("quoteSub").value,
      })
      .then((response) => {
        console.log(response);
        toast.success("Subscription Completed");
      })
      .catch(error => {
        toast.error("Subscription Error")
      });
  };

  const handleConnexion = () => {
    setOpen(false);
    if (!validEmail.test(email)) {
      setEmailErr(true);
       toast.error("Email is not valid");
    } else {
      setEmailErr(false);
    }
     

    axios
      .post("/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("token", response.data.token);
          toast.success("You Are Connected");
        } else {
          toast.error("Connexion Error");
        }
      })
      .catch(error => {
        toast.error("Connexion Error")
      });

      navigate("/")
  };

  return (
    <>
      <Dialog open={open} onClose={handleClickCloseConnexion}>
      <div class="connexion">
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent sx={{bgcolor: "#fff"}}>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{color: "#00B344"}}
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
            sx={{color: "#00B344"}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickOpenSubscribe} 
            sx={{ textDecoration: "underline", fontSize: "0.75rem", color: "#00B344" }}
          >
            No Account?
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClickCloseConnexion} sx={{color: "#00B344"}}>Cancel</Button>
          <Button onClick={handleConnexion} sx={{color: "#00B344"}}>Connect</Button>
        </DialogActions>
        </div>
      </Dialog>
      <Dialog open={openSubs} onClose={handleClickCloseSubscribe}>
        <div class="connexion">
        <DialogTitle>Subscription</DialogTitle>
        <DialogContent sx={{bgcolor: "#fff"}}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            sx={{color: "#00B344"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenConnexion} sx={{color: "#00B344"}}>Back</Button>
          <Button onClick={handleSubscribe} sx={{color: "#00B344"}}>Subscribe</Button>
        </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
