import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthAuthenticate = () => {
  const navigate = useNavigate();
  const client_id = "EYPKMDVUGG73ZWQBXB";
  const redirect_uri = "http://localhost:5173/oauth-callback";

  const handleAuth = () => {
    const authUrl = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("eventbrite_token", token);
        window.history.replaceState(null, null, window.location.pathname);
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