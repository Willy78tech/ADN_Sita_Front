import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Box } from "@mui/material";

export function ResearchProfile() {
  const [user, setUser] = React.useState({
    pseudo: "",
    quote: "",
    country: "",
    city: ""
  });
  const params = useParams();

  useEffect(() => {
    // console.log("datas here : " + datas)
    axios
      .get(`/get-user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        toast.success("Profile Loading Success");
      })
      .catch((error) => {
        toast.error("Profile Information Error");
      });
  }, []);

  // if (!user) return <CircularProgress />;

  return (
    <Box
      sx={{
        bgcolor: "#474747",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "2rem",
      }}
    >
      <p>{user.pseudo}</p>
      <p>{user.quote}</p>
      <p>{user.country}</p>
      <p>{user.city}</p>
    </Box>
  );
}
