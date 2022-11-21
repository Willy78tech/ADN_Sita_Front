import React from 'react'
import axios from "axios";
import Box from '@mui/material/Box';


export function Profile() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .get("http://localhost:3000/get-user/data.data.userId", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        });
    }
  }, []);
  return (
    <Box sx={{
      bgcolor: "#474747",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: "2rem",
    }}
    >
      <h1>Profile</h1>
    </Box>
  );
}

