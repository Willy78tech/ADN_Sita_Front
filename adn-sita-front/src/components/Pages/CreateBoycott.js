import React from 'react'
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function CreateBoycott() {
  const [open, setOpen] = React.useState(false);
  const [boycott, setBoycott] = React.useState({
    title: "",
    description: "",
    imageUrl: "",
    summary: "",
  });


  function handleChange(event) {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setBoycott({ ...boycott, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000//add-boycott", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <Box
      component="form"
      sx={{
        bgcolor: "#474747",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "2rem",
      }}
    >

      <DialogContent onSubmit={handleSubmit} sx={{ width: "40vw", color: "#ffffff", mb: "5vh" }}>
        <DialogTitle > Create a Boycott </DialogTitle>
        <TextField
          type="text"
          name="title"
          placeholder="title"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={boycott.title}
          onChange={handleChange}
        />{'\n'}
        <TextField
          type="text"
          name="description"
          placeholder="description"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={boycott.description}
          onChange={handleChange}
        />{'\n'}
        <TextField
          type="file"
          name="imageUrl"
          placeholder="image"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={boycott.image}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="summary"
          placeholder="summary"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={boycott.summary}
          onChange={handleChange}
        />

        <Button >Cancel</Button>{'\n'}
        <Button type="submit" >Create</Button>
      </DialogContent>

    </Box>
  )
}
