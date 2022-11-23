import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Button, TextField } from "@mui/material";
// import image from "../img/logo.png";

export function CreateBoycott() {
  var formData = new FormData();

  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState();

  // var imagefile = document.getElementById("file");
  formData.append("title", title);
  formData.append("summary", summary);
  formData.append("description", description);
  formData.append("file", file);

  // bodyFormData.append("title", document.getElementById("title"));
  // bodyFormData.append("summary", document.getElementById("summary"));
  // bodyFormData.append(
  //   "description",
  //   document.getElementById("description")
  // );
  // bodyFormData.append("file", document.getElementById("file"));

  function handleSubmit() {
    // event.preventDefault();
    axios
      .post("http://localhost:3000/add-boycott", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("New Boycott Created");
      })
      .catch((error) => {
        toast.error("Boycott Creation Error");
      });
  }

  function handleTitle(e) {
    setTitle(e.target.value);
    // console.log(title);
  }

  function handleSummary(e) {
    setSummary(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleFile(e) {
    setFile(e.target.file);
  }

  return (
    <>
      <Box
        // component="form"
        // onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "#474747",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        // noValidate
        autoComplete="off"
      >
        <TextField label="Title" id="title" onChange={handleTitle} />
        <TextField
          multiline
          maxRows={2}
          label="Summary"
          id="summary"
          helperText="Maximum 255 characters"
          onChange={handleSummary}
        />
        <TextField multiline maxRows={4} label="Description" id="description" onChange={handleDescription}/>
        <TextField type="file" helperText="Image *" id="file" onChange={handleFile}/>
        <Button onClick={handleSubmit}>Publish</Button>
      </Box>
    </>
  );
}
