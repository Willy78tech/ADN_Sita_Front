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
      <div class="comment-box">
        <Box>
          <div class="comment-text">
            <TextField
              sx={{
                label: { color: "#00b344" },
                input: { color: "#ffffff", width: "36rem" },
              }}
              id="commentInput"
              label="New Comment"
              variant="filled"
              color="success"
              focused
              rows={2}
            />
            <Button onClick={handleClick} class="comment-btn">
              Send Comment
            </Button>
          </div>
        </Box>
      </div>
      {comments.map((comment) => (
        <Box key={comment._id} sx={{paddingTop:"1rem"}}>
          <Typography paragraph>
            {comment.comment}
            {/* {comment.userId._id} */}
            {comment.userId._id == sessionStorage.getItem("userId") ? (
              <Button class="delete-btn"
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
