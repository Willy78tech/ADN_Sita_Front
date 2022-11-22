import React from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Boycott } from "./Boycott";
import Box from "@mui/material/Box";

export function Admin() {

  const [boycotts, setBoycotts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/get-boycotts")
      .then((res) => {
        setBoycotts(res.data.boycott);
        toast.success("Get Boycotts Admin");
      })
      .catch((error) => {
        toast.error("Get Boycotts Admin");
      });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#474747",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "2rem",
      }}
    >
      {boycotts.map((boycott) => {
        return <Boycott key={boycott._id} boycott={boycott} />;
      })}
    </Box>
  );
}