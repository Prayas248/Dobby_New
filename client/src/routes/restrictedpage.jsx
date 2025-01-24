import React from "react";
import { useNavigate } from "react-router-dom";

const RestrictedAccess = () => {
  const navigate = useNavigate();

  // Redirect to homepage
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#1a1919",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
        Restricted Access
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#fff" }}>
        This page is only accessible on tablet or desktop devices.
      </p>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#fff" }}>
        Reload if you are accessing with compatible device
    </p>
      <button
        onClick={handleRedirect}
        style={{
          padding: "0.8rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default RestrictedAccess;
