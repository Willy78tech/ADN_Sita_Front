import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export function Logout() {
  const navigate = useNavigate();

  function handleClick() {
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
      toast.success("Logout Successful");
      navigate("/");
    } else {
      toast.error("Already Logout");
    }
  }

  return (
    <>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
}
