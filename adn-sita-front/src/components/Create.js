import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios"
import toast from "react-hot-toast";

export function Create({ openCreate }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(openCreate);
  }, [openCreate])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);

    axios
      .post("http://localhost:3000/add-boycott", {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        image: document.getElementById("imageUrl").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        summary: document.getElementById("summary").value,
      })
      .then((response) => {
        console.log(response);
        toast.success("Vous avez bien créé un boycott !");
      });
  };

  return (
    <div>
      <Button variant="outlined-success" onClick={handleClickOpen}>
        New boycott
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Créer un boycott</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour créer un boycott, veuillez remplir les champs suivants :
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Titre"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="summary"
            label="Summary"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="country"
            label="Pays"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="Ville"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="imageUrl"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleCreate}>Créer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
