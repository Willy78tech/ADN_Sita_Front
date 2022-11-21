import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Profile } from "./components/Pages/Profile";
import toast, { Toaster } from "react-hot-toast";
//import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import {CreateBoycott}from "./components/Pages/CreateBoycott";
import {Admin} from "./components/Pages/Admin";
import {Sidebar} from "./components/Sidebar";



/* function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          //{/* <Route path="/admin" element={<Admin />} /> */
        //</Routes>
      //</Router>
      //<Toaster position="bottom-right" />
    //</>
  //);
//} */

export default function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="Admin" element={<Admin />}/>
          <Route path="/CreateBoycott" element={<CreateBoycott/>}/>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
}

//export default App;
