import React from 'react';
import axios from "axios";
import { Boycott } from "../Boycott";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

export function Admin() {

  const [boycotts, setBoycotts] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/get-boycotts")
      .then((res) => {
        setBoycotts(res.data.boycott);
        toast.success("Successfully toasted!");
      })
      .catch((error) => {
        toast.error("This didn't work.");
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