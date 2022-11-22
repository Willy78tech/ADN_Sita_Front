import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import image from '../img/logo.png'

export function CreateBoycott() {

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/add-boycott",
        {
          title: document.getElementById("title").value,
          summary: document.getElementById("summary").value,
          description: document.getElementById("description").value,
          file: image // qq chose a changer ici????
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        toast.success("New Boycott Created");
      })
      .catch((error) => {
        toast.error("Boycott Creation Error");
      });
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "#474747",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required label="Title" id="title" />
        <TextField
          required
          multiline
          maxRows={2}
          label="Summary"
          id="summary"
          helperText="Maximum 255 characters"
        />
        <TextField
          required
          multiline
          maxRows={4}
          label="Description"
          id="description"
        />
        <TextField required type="file" helperText="Image *" id="image" />
        <Button type="submit">Publish</Button>
      </Box>
    </>
  );
}
