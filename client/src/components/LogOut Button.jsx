import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const userId = JSON.parse(window.sessionStorage.getItem("userId"));
    if (userId && userId.buyerId) {
      navigate("/buyer/login");
    } else {
      navigate("/creator/login");
    }
    // Clear session storage on logout
    window.sessionStorage.removeItem("userId");
  };

  return (
    <p onClick={handleLogOut} className="logout-button">
      Sign out
    </p>
  );
};

export default LogOutButton;
