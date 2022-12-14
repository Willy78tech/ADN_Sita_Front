import React, {useReducer} from "react";
import '../App.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { Typography } from "@mui/material";
import Avatar, { genConfig } from 'react-nice-avatar';
import {
  InputBase,
  styled,
  alpha,
  Button,
  MenuItem,
  Dialog,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


export function Users() {
  const config = genConfig({ sexRandom: "man, woman", hairStyle: "mohawk" });
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate(-1);
    }
  }, [users]);

  useEffect(() => {
    (async () => {
      let userDatas;
      try {
        const response = await axios.get("/get-users", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        userDatas = response.data.users;
      
        toast.success("Search Result");
        
      } catch (error) {
        toast.error("Search Error");
      }
      setAllUsers(userDatas);
      setUsers(userDatas);

    })();
  }, []);


  

  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .get("/get-user/" + sessionStorage.getItem("userId"), {
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
    }
  }, []);


  const filterCards = event => {
    const value = event.target.value;
    const filteredUsers = allUsers.filter(
      (users) =>
      (
        `${users.pseudo} ${users.city} ${users.country}`
          .toLowerCase()
          .includes(value.toLowerCase())
      ),
    );
    setAllUsers(filteredUsers); 
  }


  return (
    <>
      <Box sx={{ bgcolor: "#474747" }}>
        <Box sx={{ bgcolor: "#474747", width: "300px", marginTop:"1rem" }}>
          <SearchBox sx={{ height: "1" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              id="input"
              placeholder="Search???"
              onInput={filterCards}
            />
          </SearchBox>
        </Box>
      </Box>
      <div class="users">
        {allUsers.map((user) => {
          function handleClick() {
            sessionStorage.setItem("userId", user._id);
            navigate("/profile");
            axios
              .get("/get-user/" + sessionStorage.getItem("userId"), {
              })
              .then((res) => {
                console.log(res);
                setUser(res.data.user);
              })
          }


          return (
            <div class="card">
              <div class="card_title" style={{ color: "#00b344"}}>{user.pseudo}</div>
              <div class="card_body">
                <div class="card_image"><Avatar class="avatar" style={{ width: '4rem', height: '4rem'}}  /></div>
                <p>City: {user.city}</p>
                <p>Country: {user.country}</p>
                <button class="btn" onClick={handleClick}>View Profile</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}
