import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Box, Button, Typography } from "@mui/material";

export function Comment(boycottId) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/get-comments", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setComments(res.data.comments);
        toast.success("Comments Loaded");
      })
      .catch((error) => {
        toast.error("Comment Loading Error");
      });
  }, []);

  function handleClick() {
    axios
      .post(
        "http://localhost:3000/add-comment/" + boycottId,
        {
          comment: document.getElementById("commentInput").value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // Trouver se qu'il manque pour que cela fonctionne ***************************************************
        console.log(res);
        toast.success("Comments Added");
      })
      .catch((error) => {
        toast.error("Comment Adding Error");
      });

    document.getElementById("commentInput").value.clear();
  }

  return (
    <>
      <Box component="form" noValidate >
        <TextField
          id="commentInput"
          label="New Comment"
          variant="filled"
          multiline
          rows={4}
        />
        <Button type="submit" onClick={handleClick}>Send Comment</Button>
      </Box>
      {comments.map((comment) => (
        <Box key={comment._id}>
          <Typography paragraph>{comment.comment}</Typography>
        </Box>
      ))}
    </>
  );
}
