import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";
import "../App.css";
import { Users } from "./Users";


export function Admin() {
  const navigate = useNavigate();
  const [boycotts, setBoycotts] = React.useState([]);
  const [admin, setAdmin] = React.useState(true);
  // const [allUsers, setAllUsers] = React.useState([]); // ca sert a quoi???
  const [users, setUsers] = React.useState([]);
  const [allBoycotts, setTotalBoycotts] = React.useState([]);

  React.useEffect(() => {
    if (!sessionStorage.getItem("token") || !admin) {
      navigate(-1);
    }
  }, [admin]);

  React.useEffect(() => {
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
      // setAllUsers(userDatas); // ca sert a quoi???
      setUsers(userDatas);

    })();
  }, []);

  React.useEffect(() => {
    axios
      .get("/get-user/" + sessionStorage.getItem("userId"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
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

  React.useEffect(() => {
    axios
      .get("/get-boycotts")
      .then((res) => {
        // console.log(res.data.boycott);
        setTotalBoycotts(res.data.boycott);
        toast.success("Get Boycotts Home");
      })
      .catch((error) => {
        toast.error("Get Boycotts Home");
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
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <div class="card">
              <div class="card_title_admin">Traffic</div>
              <div class="card_body">
                <p>350,897</p>
                <p><span> 3.48%...Since last month</span></p>
                <p><span class="reported">{boycotts.length}</span> boycott(s) reported</p>
              </div>
            </div>
          </Box>
          <Box>
            <div class="card">
              <div class="card_title_admin">New Users</div>
              <div class="card_body">
                <p>2,356</p>
                <p><span> 3.48%... Since last week</span></p>
                <p><span class="reported"> {users.length}</span> User(s) in Total</p>
              </div>
            </div>
          </Box>
          <Box>
            <div class="card">
              <div class="card_title_admin">Activities</div>
              <div class="card_body">
                <p>924</p>
                <p><span> 1.10%... Since yesterday</span></p>
                <p><span class="reported"> {allBoycotts.length}</span> Boycott(s) in Total</p>
              </div>
            </div>
          </Box>
          <Box>
            <div class="card">
              <div class="card_title_admin">Performance</div>
              <div class="card_body">
                <p>49,65%</p>
                <p><span> 12%... Since last month</span></p>
                <p><span>Since last month</span></p>
              </div>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
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
      </Box>
    </>
  );
}

