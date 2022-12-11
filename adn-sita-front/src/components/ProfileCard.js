import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Boycott } from "./Boycott";
import { Box } from "@mui/material";
import "../App.css";
import Avatar, { genConfig } from 'react-nice-avatar';
import avatar from "../images/image-rita.png";

export function ProfileCard() {
    const config = genConfig({ sexRandom: "man, woman", hairStyle: "mohawk" });
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        pseudo: "",
        quote: "",
        country: "",
        city: "",
    });
    const [boycott, setBoycott] = React.useState([]);

    React.useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate(-1);
        }
    }, []);
    React.useEffect(() => {
        if (sessionStorage.getItem("token")) {
            axios
                .get("/get-user/" + sessionStorage.getItem("userId"), {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    setUser(res.data.user);
                    toast.success("Profile Loading Success");
                })
                .catch((error) => {
                    toast.error("Profile Information Error");
                });
        }
    }, []);

    React.useEffect(() => {
        if (sessionStorage.getItem("token")) {
            axios
                .get("/get-boycott-created/" + sessionStorage.getItem("userId"), {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setBoycott(res.data.boycotts);
                    toast.success("Boycott Created Success");
                })
                .catch((error) => {
                    toast.error("Boycott Created Error");
                });
        }
    }, []);
    return (
        <>
            <Box
                sx={{
                    bgcolor: "#474747",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: "2rem",
                }}
            >
                <div className="card-container">
                    <header class="header_profile">
                        {/* <Avatar class="image_profile" style={{ width: '20rem', height: '20rem' }} {...config} /> */}
                        <img class="image_profile" src={avatar} alt="photo de profile" />
                    </header>
                    <h1 className="bold-text">
                        {user.pseudo}
                    </h1>
                    <h2 className="normal-text">{user.quote}</h2>
                    <h2 className="normal-text">{user.city}</h2>
                    <h2 className="normal-text">{user.country}</h2>
                    <div className="social-container">
                        <div className="followers">
                            <h1 className="bold-text">80K</h1>
                            <h2 className="smaller-text">Followers</h2>
                        </div>
                        <div className="likes">
                            <h1 className="bold-text">803K</h1>
                            <h2 className="smaller-text">Likes</h2>
                        </div>
                        <div className="photos">
                            <h1 className="bold-text">1.4K</h1>
                            <h2 className="smaller-text">Photos</h2>
                        </div>
                    </div>
                </div>
                {boycott.map((boycott) => {
                    return <Boycott key={boycott._id} boycott={boycott} />;
                })}
            </Box>
        </>
    );
}

