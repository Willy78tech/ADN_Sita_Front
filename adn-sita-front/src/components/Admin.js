import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";
import "../App.css";


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
                <p><span> 3.48%</span></p>
                <p>Since last week</p>
              </div>
            </div>
          </Box>
          <Box>
            <div class="card">
              <div class="card_title_admin">Sales</div>
              <div class="card_body">
                <p>924</p>
                <p><span> 1.10%</span></p>
                <p>Since yesterday</p>
              </div>
            </div>
          </Box>
          <Box>
            <div class="card">
              <div class="card_title_admin">Performance</div>
              <div class="card_body">
                <p>49,65%</p>
                <p><span> 12%</span></p>
                <p>Since last month</p>
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

