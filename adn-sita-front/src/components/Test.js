import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Test() {
  const navigate = useNavigate();

  //   function handleClick() {
  //     console.log("The link was clicked.");
  //     axios
  //       .get("http://localhost:3000/get-users", {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       });
  //   }

  //   function handleRoute() {
  //     navigate("/profile");
  //   }

  return (
    <div>
      <button onClick={() => navigate("profile")}>test</button>
    </div>
  );
}
