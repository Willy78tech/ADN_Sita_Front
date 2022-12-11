import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { Box, Typography } from "@mui/material";
import Avatar, { genConfig } from 'react-nice-avatar';
import "../App.css";


export function Users() {
  const config = genConfig({ sexRandom: "man, woman", hairStyle: "mohawk" });
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

            <div class="card">
              <div class="card_title">{user.pseudo}</div>
              <div class="card_body">
                <p>City: {user.city}</p>
                <p>Country: {user.country}</p>
                <div class="card_image"><Avatar style={{ width: '4rem', height: '4rem' }} {...config} /></div>
              </div>
            </div>
          )
        })}
      </Box>
    </>
  );
}
