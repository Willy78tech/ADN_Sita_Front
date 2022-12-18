import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { Admin } from "./components/Admin";
import { Error } from "./components/Error";
import { ProfileCard } from "./components/ProfileCard";
import { CreateBoycott } from "./components/CreateBoycott";
import { ResearchProfile } from "./components/ResearchProfile";
import axios from "axios";

export default function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<ProfileCard />} />
          <Route path="users" element={<Users />} />
          <Route path="admin" element={<Admin />} />
          <Route path="createBoycott" element={<CreateBoycott />} />
          <Route path="researchProfile/:id" element={<ResearchProfile />} />
          <Route path="error" element={<Error />} />
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
}
