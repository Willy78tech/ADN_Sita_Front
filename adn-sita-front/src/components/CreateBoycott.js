import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

// import image from "../img/logo.png";

export function CreateBoycott() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState();

  React.useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate(-1);
    }
  }, []);

  const sendWebhook = async (url, data) => {
    const form = new FormData();
    form.append("title", title);
    form.append("summary", summary);
    form.append("description", description);
    form.append("file", file);
    form.append("payload_json", JSON.stringify(data));
    await axios.post(url, form);
  };

  function handleSubmit() {
    const sendWebhook = async (url, data) => {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("file", file);
      form.append("payload_json", JSON.stringify(data));
      await axios.post(url, form);
    };
    let formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .post("/add-boycott", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data; boundary=???",
        },
      })
      .then((res) => {
        toast.success("New Boycott Created");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Boycott Creation Error");
      });

    sendWebhook(
      "https://discord.com/api/webhooks/1053935325837262888/N6qxbJF2ajxfo7mnlzLX3ba5Fy2Q-T-UyxFee_Fsh9YNILuPzv94-DdDIlAfrGOvpw40",
      {
        username: "Le boycott BOT",
        content: "\nNEW BOYCOTT CREATED!\n\n " + title.toUpperCase() + "\n" + description
        
      }
    );
  }

  function handleTitle(e) {
    setTitle(e.target.value);
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
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "#474747",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
        autoComplete="off"
      >
        <div class="boycott-form">
          <div class="boycott-label">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00b344",
                  },
                },
              }}
              inputProps={{ style: { color: "#ffffff" } }}
              label="Title"
              id="title"
              onChange={handleTitle}
              color="success"
              focused
              required
            />
          </div>
          <div class="boycott-label">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00b344",
                  },
                },
              }}
              required
              multiline
              inputProps={{ style: { color: "#ffffff" } }}
              maxRows={3}
              label="Summary"
              id="summary"
              color="success"
              focused
              helperText="Maximum 255 characters"
              FormHelperTextProps={{ style: { color: "rgba(0,179,68,0.4)" } }}
              onChange={handleSummary}
              // sx={{label:{color:"#00b344"}, input:{color:"#ffffff"}}}
            />
          </div>
          <div class="boycott-label">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00b344",
                  },
                },
              }}
              required
              multiline
              inputProps={{ style: { color: "#ffffff" } }}
              maxRows={4}
              label="Description"
              id="description"
              onChange={handleDescription}
              color="success"
              focused
            />
          </div>
          <div class="boycott-input">
            <label for="inputTag">
              Select Image
            <input type="file" id="inputTag" onChange={handleFile} style={{display:"none"}} />
            </label>
          </div>
          <Button onClick={handleSubmit} class="publish-btn">
            Publish
          </Button>
        </div>
      </Box>
    </>
  );
}
