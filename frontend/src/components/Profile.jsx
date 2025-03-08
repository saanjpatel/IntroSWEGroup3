import React from "react";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1>Profile</h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
};

export default Profile;