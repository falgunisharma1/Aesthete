import React from "react";
import { useState, useEffect } from "react";
import Login from "../Login";


const BLogin = ()=>{
const isBuyer = true;

  return (

    <div>
      <Login isBuyer={isBuyer}/>
    </div>
  )
}

export default BLogin