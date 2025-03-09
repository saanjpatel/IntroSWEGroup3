import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
<<<<<<< Updated upstream
import UpdatePassword from "./UpdatePassword.jsx";

=======
import UpdatePassword from "./components/UpdatePassword"; //
>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
<<<<<<< Updated upstream
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  </React.StrictMode>
);