import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Search() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

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

    
    /* axios
      .get("/get-users", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDatas(res.data.users);
        setAllDatas(res.data.users);
        setOpen(true);
        toast.success("Search Result");
      })
      .catch((error) => {
        toast.error("Search Error");
      });
  } , []);
 */
  const filterCards = event => {
    const value = event.target.value;
    const filteredUsers = allUsers.filter(
      (user) =>
       ( user.city.toLowerCase().includes(value.toLowerCase()) ||
        user.pseudo.toLowerCase().includes(value.toLowerCase()) ||
        user.country.toLowerCase().includes(value.toLowerCase())
        )
    );
    setAllUsers(filteredUsers);
    console.log(filteredUsers);
  }
  return (
    <>
      <Box sx={{display: "flex"}}>
        <SearchBox sx={{ height: "1" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            id="input"
            placeholder="Search…"
            onInput={filterCards}
          />
        </SearchBox>
        
        {/* <Button variant="contained" color="success" onClick={handleSearch}>
          Search
        </Button> */}
      </Box>
      {/* <Dialog onClose={handleClose} open={open}>
        {datas.map((user) => {
          return user.city == searchInput ||
            user.pseudo == searchInput ||
            user.country == searchInput ? (
            <MenuItem
              key={user._id}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(user._id);
              }}
            >
              {user.pseudo}
            </MenuItem>
          ) : null;
        })}
      </Dialog> */}
    </>
  );
}
