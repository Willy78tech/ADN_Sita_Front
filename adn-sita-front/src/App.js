import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import {Admin} from "./components/Admin";
import {CreateBoycott}from "./components/CreateBoycott";
import {ResearchProfile}from "./components/ResearchProfile";


export default function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="admin" element={<Admin />}/>
          <Route path="createBoycott" element={<CreateBoycott/>}/>
          <Route path="researchProfile" element={<ResearchProfile/>}/>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );

}