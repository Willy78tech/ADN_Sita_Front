import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export function CreateBoycott() {
  // const [open, setOpen] = React.useState(false);
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
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "#474747",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        noValidate
        autoComplete="off"
      >
        
          <TextField
            required
            label="Title"
          />
          <TextField
            required
            multiline
            maxRows={2}
            label="Summary"
            helperText="Maximum 255 characters"

          />
          <TextField
            required
            multiline
            maxRows={4}
            label="Description"
          />
          <TextField
            required
            type="file"
            helperText="Image *"
          />
      </Box>
    </>

    // <Box
    //   component="form"
    //   sx={{
    //     bgcolor: "#474747",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     p: "2rem",
    //   }}
    // >
    //   <DialogContent
    //     onSubmit={handleSubmit}
    //     sx={{ width: "40vw", color: "#ffffff", mb: "5vh" }}
    //   >
    //     <DialogTitle> Create a Boycott </DialogTitle>
    //     <TextField
    //       type="text"
    //       name="title"
    //       placeholder="title"
    //       id="outlined-basic"
    //       label="Outlined"
    //       variant="outlined"
    //       value={boycott.title}
    //       onChange={handleChange}
    //     />
    //     {"\n"}
    //     <TextField
    //       type="text"
    //       name="description"
    //       placeholder="description"
    //       id="outlined-basic"
    //       label="Outlined"
    //       variant="outlined"
    //       value={boycott.description}
    //       onChange={handleChange}
    //     />
    //     {"\n"}
    //     <TextField
    //       type="file"
    //       name="imageUrl"
    //       placeholder="image"
    //       id="outlined-basic"
    //       label="Outlined"
    //       variant="outlined"
    //       value={boycott.image}
    //       onChange={handleChange}
    //     />
    //     <TextField
    //       type="text"
    //       name="summary"
    //       placeholder="summary"
    //       id="outlined-basic"
    //       label="Outlined"
    //       variant="outlined"
    //       value={boycott.summary}
    //       onChange={handleChange}
    //     />
    //     <Button>Cancel</Button>
    //     {"\n"}
    //     <Button type="submit">Create</Button>
    //   </DialogContent>
    // </Box>
  );
}
