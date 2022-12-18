import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Box, Button, Typography } from "@mui/material";

export function Comment({ boycott }) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/get-boycott/" + boycott._id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.boycott.comments);
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
        "/add-comment/" + boycott._id,
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
        console.log(res);
        toast.success("Comments Added");
      })
      .catch((error) => {
        toast.error("Comment Adding Error");
      });
  }

  function handleDelete(id) {
    axios
      .delete(
        "/delete-comment/" + id,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Comments Added");
      })
      .catch((error) => {
        toast.error("Comment Adding Error");
      });
  }

  return (
    <>
      <Box>
        <TextField
          id="commentInput"
          label="New Comment"
          variant="filled"
          multiline
          rows={2}
        />
        <Button onClick={handleClick}>Send Comment</Button>
      </Box>
      {comments.map((comment) => (
        <Box key={comment._id}>
          <Typography paragraph>
            {comment.comment}
            {comment.userId._id == sessionStorage.getItem("userId") ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(comment._id);
                }}
              >
                Delete
              </Button>
            ) : null}
          </Typography>
        </Box>
      ))}
    </>
  );
}
