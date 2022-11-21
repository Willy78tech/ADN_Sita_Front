import React from "react";

//import { makeStyles } from "@material-ui/core/styles";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';






export function Sidebar(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let handler = () => {
      setOpen(false);
    };
    document.addEventListener("moussedown", handler);
  });




  const { history } = props;
  //const classes = useStyles();
  const navigate = useNavigate();
  console.log(history)
  const itemslist = [
    { text: "Home", onclick: () => navigate("/") },
    {
      text: "Admin",
      onclick: () => navigate("Admin")
    },
    {
      text: "CreateBoycott",
      onclick: () => navigate("CreateBoycott")
    },
    {
      text: "Profile",
      onclick: () => navigate("Profile")
    }
  ];
  return (
    <Drawer variant="permanent" sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box' },
    }}>
      <List open={open} >
        {itemslist.map((item, index) => {
          const { text, icon, onclick } = item;
          return (
            <ListItemButton key={text} onClick={onclick}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};





