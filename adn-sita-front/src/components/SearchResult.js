import React from "react";

export function SearchResult({ datas }) {
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    console.log("datas here : " + datas)
    if(datas){
        setResult(datas);
    }
  }, []);

  return (
    <>
      {result.map((data) => (
        <p>{data.pseudo}</p>
      ))}
    </>
  );
}
