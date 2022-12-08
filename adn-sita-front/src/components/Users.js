import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { Box, Typography, Avatar } from "@mui/material";


export function Users() {
  const navigate = useNavigate();
  const [datas, setDatas] = React.useState([]);

    React.useEffect(() => {
        if (!sessionStorage.getItem("token")) {
          navigate(-1);
        }
      }, []);
    
    React.useEffect(() => {
        axios
        .get("/get-users", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setDatas(res.data.users);
          toast.success("Search Result");
        })
        .catch((error) => {
          toast.error("Search Error");
        });
    }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: "#474747",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "2rem",
        }}
      >
        <Search />
        {datas.map((user) => {
            return (
                <Box sx={{display: "flex"}}>
                    <Avatar sx={{m: "10px"}}>{user.pseudo[0]}</Avatar>
                    <Typography sx={{color: "white"}}>{user.pseudo}</Typography>
                </Box>
            )
        })}
      </Box>
    </>
  );
}
