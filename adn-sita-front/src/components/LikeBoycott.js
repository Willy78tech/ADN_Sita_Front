import React from "react";
import { IconButton } from "@mui/material";
import { Boycott } from "./Boycott";
import { Home } from "./Home";
import toast from "react-hot-toast";
import axios from "axios";

export function LikeBoycott(boycottId) {
  const [participation, setParticipation] = React.useState(false);



  function handleClick() {
    if (participation) {
      axios
        .post("/unfollow-boycott/" + boycottId, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setParticipation(false);
          toast.success("Boycott Unliked");
        })
        .catch((error) => {
          toast.error("Boycott Not Unliked");
        });
    } else {
      axios
        .post("/follow-boycott/" + sessionStorage.getItem({ boycottId }), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setParticipation(true);
          toast.success("Boycott Liked");
        })
        .catch((error) => {
          toast.error("Boycott Not Liked");
        });
    }
  }
  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        {participation ? (
          <img src="img/logo.png" alt="Like" height="30vh" />
        ) : (
          <img src="img/logoEmpty.png" alt="Like" height="30vh" />
        )}
      </IconButton>
    </>
  );
};
