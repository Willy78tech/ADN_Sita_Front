import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Box, Button, Typography } from "@mui/material";

export function Comment({boycottId}) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    console.log(boycottId);
    axios
      .get("http://localhost:3000/get-boycott/" + boycottId, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setComments(res.data.boycott.comments);
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
        // console.log(res);
        toast.success("Comments Added");
      })
      .catch((error) => {
        toast.error("Comment Adding Error");
      });
  }

  return (
    <>
      <Box >
        <TextField
          id="commentInput"
          label="New Comment"
          variant="filled"
          multiline
          rows={4}
        />
        <Button onClick={handleClick}>Send Comment</Button>
      </Box>
      {comments.map((comment) => (
        <Box key={comment._id}>
          <Typography paragraph>{comment.comment}</Typography>
        </Box>
      ))}
    </>
  );
}