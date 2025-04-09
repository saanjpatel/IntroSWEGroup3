import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthAuthenticate = () => {
  const navigate = useNavigate();
  const client_id = "EYPKMDVUGG73ZWQBXB";  // Your Eventbrite Client ID
  const redirect_uri = "http://localhost:5173/oauth-callback";  // Redirect URL for your React app

  // This function triggers the OAuth flow.
  const handleAuth = () => {
    // Build the authorization URL using implicit grant (response_type=token)
    const authUrl = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    // Redirect the browser to Eventbrite's OAuth page.
    window.location.href = authUrl;
  };

  useEffect(() => {
    // In case the user comes back with a token in the URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove '#' at beginning
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      if (token) {
        // Store the token in localStorage so your app can use it
        localStorage.setItem("eventbrite_token", token);
        // Optional: Clean the URL by removing the fragment.
        window.history.replaceState(null, null, window.location.pathname);
        // Redirect to the events page (or anywhere you want after auth)
        navigate("/events");
      }
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Authorize with Eventbrite</h1>
      <p>Please click the button below to grant your account access.</p>
      <button onClick={handleAuth} style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
        Allow Access
      </button>
    </div>
  );
};

export default OAuthAuthenticate;