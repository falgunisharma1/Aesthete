import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import LogOutButton from "./LogOut Button";

const AppName = () => {
  const location = useLocation();

  // Define the paths where the LogOutButton should be visible
  const pathsWithLogOutButton = [
    "/shop/:creator_id",
    "/mycart",
    "/",
    "/myshop/update-content/:content_id",
    "/myshop/:creator_id",
    "/myshop/new/:creator_id",
  ];

  // Function to check if the current path matches any of the pathsWithLogOutButton
  const isLogOutButtonVisible = () => {
    return pathsWithLogOutButton.some((path) => {
      return matchPath({ path, exact: true, strict: false }, location.pathname);
    });
  };

  return (
    <div className="app_name_container">
      <div className="app_name">
        <Link to="/" className="app_name_link">
          Aesthete
        </Link>
      </div>
      <div>
        {isLogOutButtonVisible() && <LogOutButton />}
      </div>
    </div>
  );
};

export default AppName;
