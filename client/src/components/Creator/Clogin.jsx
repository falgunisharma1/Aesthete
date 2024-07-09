import React from "react";
import Login from "../Login";

const Clogin = () => {
  const isBuyer = false;

  return (
    <div>
      <Login isBuyer={isBuyer} />
    </div>
  );
};

export default Clogin;
