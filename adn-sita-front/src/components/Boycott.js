import * as React from "react";
import { format } from "date-fns";
import { MenuBoycott } from "./MenuBoycott";
import { Comment } from "./Comment";
import axios from "axios";
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

const SubHeader = styled(Card)(({ theme }) => ({
  color: "#00B440",
  backgroundColor: "#1e1e1e",
  boxShadow: "0 0 0 0",
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
        avatar={<Avatar sx={{ bgcolor: "#00b440" }} aria-label="recipe" />}
        action={
          <MenuBoycott
            boycott={boycott}
            boycottId={boycott._id}
            reported={boycott.isReport}
            reports={boycott.reports.length}
          />
        }
        title={boycott.title}
        subheader={<SubHeader>{formattedDate}</SubHeader>}
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
        <LikeBoycott boycott={boycott}/>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "#00b344" }} />
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
          {sessionStorage.getItem("token") ? (
            <Comment boycott={boycott} />
          ) : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}
