import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";

export function Home() {
  const [boycotts, setBoycotts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/get-boycotts")
      .then((res) => {
        setBoycotts(res.data.boycott);
        toast.success("Get Boycotts Home");
      })
      .catch((error) => {
        toast.error("Get Boycotts Home");
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
