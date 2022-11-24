import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";

export function Admin() {
  const [boycotts, setBoycotts] = React.useState([]);

  React.useEffect(() => { 
    axios
      .get(
        "http://localhost:3000/get-user/" + sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.user.isAdmin === true) {
          axios
            .get("http://localhost:3000/get-reports", {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              console.log(res);
              setBoycotts(res.data.reports);
              toast.success("Get Reported Boycotts");
            })
            .catch((error) => {
              toast.error("Get Reported Boycotts");
            });
          toast.success("Is Admin");
        } else {
          toast.success("Is Not Admin");
        }
      })
      .catch((error) => {
        toast.error("Admin Check Error");
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
        return <Boycott key={boycott._id} boycott={boycott}/>;
      })}
    </Box>
  );
}