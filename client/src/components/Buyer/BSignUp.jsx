import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch";

const BSignUp = () => {
  const [newBuyerData, setNewBuyerData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    user_id: "",
    buyer_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const isLoginPage = false;
  const isBuyerPage = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateUser(newBuyerData);
  };

  const handleCreateUser = async (userObj) => {
    try {
      const response = await fetch(`${backendUrl}/buyer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await response.json();

      if (data.user.username) {
        window.sessionStorage["userId"] = JSON.stringify({
          userId: data.user.user_id,
          buyerId: data.user.buyer_id,
        });
        setNewBuyerData(data);
        navigate(`/buyer/login`);
      } else {
        console.log(newBuyerData);
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while creating the buyer account.");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sign-up-outside">
      <ToggleSwitch isBuyerPage={isBuyerPage} isLoginPage={isLoginPage} />
      <div className="sign-up">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={newBuyerData.name}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newBuyerData.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={newBuyerData.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={newBuyerData.password}
              onChange={handleInput}
            />
          </div>
          <button type="submit">Sign-Up</button>
        </form>
        <Link to="/buyer/login" className="login-link">
          Already Signed Up?
        </Link>
        <div className="error-message-createUser">
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default BSignUp;
