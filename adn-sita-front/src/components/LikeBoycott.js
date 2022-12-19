import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Boycott } from "./Boycott";
import { Home } from "./Home";
import { IconButton } from "@mui/material";

export function LikeBoycott({ boycott }) {
  const [participation, setParticipation] = React.useState(false);

  React.useEffect(() => {
    for (let i = 0; i < boycott.followers.length; i++) {
      if (boycott.followers[i] == sessionStorage.getItem("userId")) {
        setParticipation(true)
      } else {
        setParticipation(false)
      }
    }
  }, [boycott])

  function handleClick() {
    if (participation) {
      axios
        .post("/unfollow-boycott/" + boycott._id, {}, {
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
        .post("/follow-boycott/" + boycott._id, {}, {
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
}
