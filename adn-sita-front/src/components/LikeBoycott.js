import React from "react";
import { IconButton } from "@mui/material";

export function LikeBoycott() {
  const [participation, setParticipation] = React.useState(false);

  React.useEffect(() => {
    // axios ici avec le setParticipation ********************************
  }, []);

  function handleClick() {
    // Fonction temporaire, axios ici ************************************
    setParticipation(!participation);
  }

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        {participation ? (
          <img src="img/logo.png" alt="Like" height="30vh" />
        ) : (
          <img src="img/logoEmpty.png" alt="Like" height="30vh" />
        )}
      </IconButton>
    </>
  );
}
