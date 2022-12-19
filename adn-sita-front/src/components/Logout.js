import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../App.css";

export function Logout() {
  const navigate = useNavigate();

  function handleClick() {
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
      toast.success("Logout Successful");
      navigate("/");
      window.location.reload();
    } else {
      toast.error("Already Logout");
    }
  }

  return (
    <>
      <Button class="logout" onClick={handleClick}>Logout</Button>
    </>
  );
}
