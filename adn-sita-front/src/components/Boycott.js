import * as React from "react";
import { format } from "date-fns";
import { MenuBoycott } from "./MenuBoycott";
import { Comment } from "./Comment";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LikeBoycott } from "./LikeBoycott";

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
  const [expanded, setExpanded] = React.useState(false);

  const date = new Date(boycott.createdAt);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  return (
    <Card
      sx={{ width: "40vw", bgcolor: "#1e1e1e", color: "#ffffff", mb: "5vh" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#00b440" }} aria-label="recipe" />
        }
        action={
          <MenuBoycott/>
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
        <LikeBoycott/>
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
          <Comment boycottId={boycott._id}/>
        </CardContent>
      </Collapse>
    </Card>
  );
}
