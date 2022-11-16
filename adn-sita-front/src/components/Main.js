import React from "react";
import axios from "axios";
import { Boycott } from "./Boycott";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

export function Main() {
  const [boycotts, setBoycotts] = React.useState([]);

  React.useEffect(() => {
    // fetch("http://localhost:3000/get-boycotts")
    //   .then((res) => {
    //     setBoycotts(res.data.boycott);
    //   })
    //   .catch((error) => {
    //     toast.error("This didn't work.");
    //   });
    axios
      .get("http://localhost:3000/get-boycotts")
      .then((res) => {
        console.log(res.data.boycott);
        setBoycotts(res.data.boycott);
      })
      .catch((error) => {
        toast.error("This didn't work.");
      });
  }, []);

  return (
    <Box sx={{bgcolor: "#474747", display: "flex", flexDirection: "column", alignItems: "center", p: "2rem"}}>
        {boycotts.map((boycott) => {
          return <Boycott key={boycott._id} boycott={boycott} />;
        })}
    </Box>
  );
}
