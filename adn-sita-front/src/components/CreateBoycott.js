import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Button, TextField } from "@mui/material";
// import image from "../img/logo.png";

export function CreateBoycott() {
  // var formData = new FormData();

  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState();

  
  function handleSubmit() {
    let formData = new FormData();
    
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("file", file, file.name);

    // event.preventDefault();
    // formData.append("file", file, file.name);
    // formData.append("title", "un titre allo");
    // formData.append("summary", "un summary allo");
    // formData.append("description", "un description allo");

    // console.log(formData);

    axios.post("/add-boycott", {
      formData,
      // title: "title alex",
      // summary: "summary alex",
      // description: "description alex",
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
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
    setFile(e.target.files[0]);
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
        <input type="file" onChange={handleFile} />
        {/* <TextField type="file" helperText="Image *" id="file" onChange={handleFile}/> */}
        <Button onClick={handleSubmit}>Publish</Button>
      </Box>
    </>
  );
}
