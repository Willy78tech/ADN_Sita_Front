import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";
import { et } from "date-fns/locale";
import { color } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Boycott({ boycott }) {
  const date = new Date(boycott.createdAt);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ width: "40vw", bgcolor: "#1e1e1e", color: "#ffffff", mb: "5vh" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#00b440" }} aria-label="recipe">
            {/* <AccountCircle /> */}
            {/* ! */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon color="white" sx={{ color: "white" }} />
          </IconButton>
        }
        title={boycott.title}
        subheader={formattedDate}
        color="#ffffff"
      />
      <CardMedia
        component="img"
        height="194"
        src={"https://images.kalanso.top/" + boycott.imageUrl}
        alt="image of the boycott"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          {boycott.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "white" }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "white" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ color: "white" }}>
            {boycott.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
