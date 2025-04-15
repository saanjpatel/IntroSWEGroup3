import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Weather from './components/Weather';
import Tracking from './components/Tracking';
import UpdatePassword from './components/UpdatePassword.jsx';
import Events from './components/Events';
import OAuthAuthenticate from './components/OAuthAuthenticate';
import Goal from "./components/Goal.jsx";
import Analytics from "./components/Analytics.jsx";

function App() {
  const [exercises, setExercises] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('exercises');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever exercises change
  useState(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

const [goals, setGoals] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever goals change
  useState(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/oauth-callback" element={<OAuthAuthenticate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/tracking"
          element={
            <Tracking
              exercises={exercises}
              setExercises={setExercises}
            />
          }
        />
        <Route
          path="/goal"
          element={
            <Goal
              goals={goals}
              setGoals={setGoals}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;