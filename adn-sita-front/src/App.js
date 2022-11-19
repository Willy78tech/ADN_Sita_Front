import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Profile } from "./components/Profile";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
