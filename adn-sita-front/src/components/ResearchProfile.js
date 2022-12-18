import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";

export function ResearchProfile() {
  const [user, setUser] = React.useState({
    pseudo: "",
    quote: "",
    country: "",
    city: "",
  });
  const [boycott, setBoycott] = React.useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/get-user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        toast.success("Profile Loading Success");
      })
      .catch((error) => {
        toast.error("Profile Information Error");
      });
  }, []);

  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .get("/get-boycott-created/" + params.id, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBoycott(res.data.boycotts);
          toast.success("Boycott Created Success");
        })
        .catch((error) => {
          toast.error("Boycott Created Error");
        });
    }
  }, []);
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
      {boycott.map((boycott) => {
        return <Boycott key={boycott._id} boycott={boycott} />;
      })}
    </Box>
  );
}
