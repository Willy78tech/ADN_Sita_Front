import axios from 'axios';
import React from 'react'

export function Test() {
    function handleClick() {
        console.log('The link was clicked.');
        axios.get("http://localhost:3000/get-users", {
            headers: {
               Authorization: `Bearer ${sessionStorage.getItem("token")}` 
    }}) 
            .then(response => {
                console.log(response);
            })

    }
  return (
    <div>
        <button onClick={handleClick} >

            test
        </button>
    </div>
  )
}
