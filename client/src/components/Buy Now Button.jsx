import React from "react";
import { Link } from "react-router-dom";

const BuyNowButton = ()=>{
  return(
    <Link to="/mycart" className="buy_now_button">
      <button>Buy Now</button>
    </Link>
  )
}

export default BuyNowButton