import React from "react";
import { IconButton } from "@mui/material";
import { Boycott } from "./Boycott";
import toast from "react-hot-toast";
import axios from "axios";

export function LikeBoycott() {
  const [participation, setParticipation] = React.useState(false);
  
   
  
    function handleClick() {
      if ((!participation) && sessionStorage.getItem("token")) {
    axios
          .post("/follow-boycott/" + sessionStorage.getItem("userId"), {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setParticipation(res.data.participations);
            toast.success("Follow Success");
          })
          .catch((error) => {
            toast.error("Follow Error");
          });

    } else {

      axios
          .post("/unfollow-boycott/" + sessionStorage.getItem("userId"), {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setParticipation(res.data.participations);
            toast.success("Unfollow Success");
          })
          .catch((error) => {
            toast.error("Unfollow Error");
          });
        }
      }
    /* }, [participation]); */

      


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
