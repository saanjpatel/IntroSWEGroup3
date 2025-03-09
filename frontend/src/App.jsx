import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
<<<<<<< Updated upstream
import UpdatePassword from "./components/UpdatePassword.jsx";
=======
import UpdatePassword from "./UpdatePassword"; // import the Forgot Password component
>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-password" element={<UpdatePassword />} />  {/* new route added */}
      </Routes>
    </Router>
  </React.StrictMode>
);