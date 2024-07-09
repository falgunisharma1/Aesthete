import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ToggleSwitch = ({ isBuyerPage, isLoginPage }) => {
  const navigate = useNavigate();

  const handleToggle = () => {
    const targetPath1 = isBuyerPage ? "/creator" : "/buyer";
    const targetPath2 = isLoginPage ? "/login" : "/signup";

    const finalTargetPath = `${targetPath1}${targetPath2}`
    navigate(finalTargetPath);
  };

  return (
    <div className="toggle-container">
      <button onClick={handleToggle} className={`toggle ${isBuyerPage ? "left" : "right"}`}>
        <div className="options">
        <span className="option1">Buyer -</span>
        <span className="option2">Creator</span>
        </div>
      </button>
      <div className={`indicator ${isBuyerPage ? "left" : "right"}`}></div>
    </div>
  );
};

export default ToggleSwitch;
