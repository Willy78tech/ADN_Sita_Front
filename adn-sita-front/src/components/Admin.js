import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";

export function Admin() {
  const navigate = useNavigate();
  const [boycotts, setBoycotts] = React.useState([]);
  const [admin, setAdmin] = React.useState(true);

  React.useEffect(() => {
    if (!sessionStorage.getItem("token") || !admin) {
      toast.error("criss");
      navigate(-1);
    }
  }, [admin]);

  React.useEffect(() => { 
    axios
      .get(
        "/get-user/" + sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.user.isAdmin === true) {
          setAdmin(true);
          axios
            .get("/get-reports", {
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
          setAdmin(false);
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
