import React from "react";
import Login from "../Login";
import ToggleSwitch from "../ToggleSwitch"

const Clogin = () => {
  const isBuyer = false;
  const isLoginPage = true;

  return (
    <div>
       <div className="toggle">
      <ToggleSwitch isBuyerPage={isBuyer} isLoginPage={isLoginPage}/></div>
      <Login isBuyer={isBuyer} />
    </div>
  );
};

export default Clogin;
