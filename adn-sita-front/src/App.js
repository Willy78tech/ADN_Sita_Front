import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import {Admin} from "./components/Admin";
import {CreateBoycott}from "./components/CreateBoycott";
import {ResearchProfile}from "./components/ResearchProfile";
import axios from "axios";


export default function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="admin" element={<Admin />}/>
          <Route path="createBoycott" element={<CreateBoycott/>}/>
          <Route path="researchProfile/:id" element={<ResearchProfile/>}/>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );

}