import React from "react";
import { useState, useEffect } from "react";
import Login from "../Login";
import ToggleSwitch from "../ToggleSwitch"



const BLogin = ()=>{
const isBuyer = true;
const isLoginPage = true;

  return (

    <div className="top-login">
      <div className="toggle">
      <ToggleSwitch isBuyerPage={isBuyer} isLoginPage={isLoginPage} /></div>
      <Login isBuyer={isBuyer}/>
    </div>
  )
}

export default BLogin