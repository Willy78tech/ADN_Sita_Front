import React from "react";
import axios from "axios";
import { Boycott } from "./Boycott";

export function Main() {

  React.useEffect(() => {
    axios.get("http://localhost:3000/get-boycotts")
    .then((boycotts) => {

    });
  });
  
  return <Boycott />;
}
