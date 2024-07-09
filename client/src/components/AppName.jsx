import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOut Button"

const AppName = () => {
  return (
    <div className="app_name">
      <Link to="/" className="app_name_link">
        Aesthete
      </Link>
    </div>
  );
};

export default AppName;
