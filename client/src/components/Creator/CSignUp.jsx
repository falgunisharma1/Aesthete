import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch";

const CreatorSignUp = () => {
  const [newCreatorData, setNewCreatorData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    profile_image: "",
    cover_image: "",
    bio: "",
    user_id: "",
    creator_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const isLoginPage = false;
  const isBuyerPage = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateUser(newCreatorData);
  };

  const handleCreateUser = async (userObj) => {
    try {
      const response = await fetch(`${backendUrl}/creator/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await response.json();
      console.log(data)

      if (data.user.username) {
        setNewCreatorData(data);
        window.sessionStorage.setItem("userId", JSON.stringify({
          userId: data.user.user_id,
          buyerId: data.user.buyer_id,
          creatorId: data.user.creator_id,
        }));
        console.log( window.sessionStorage)
        navigate(`/myshop/${data.user.creator_id}`);
      } else {
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while creating the account.");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewCreatorData((prev) => ({ ...prev, [name]: value }));
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
              value={newCreatorData.name}
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
              value={newCreatorData.email}
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
              value={newCreatorData.username}
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
              value={newCreatorData.password}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="bio">
              <strong>Bio</strong>
            </label>
            <textarea
              placeholder="Add what makes you YOU!"
              name="bio"
              value={newCreatorData.bio}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="profile_image">
              <strong>Profile Picture</strong>
            </label>
            <input
              type="text"
              name="profile_image"
              placeholder="Your Profile image link"
              value={newCreatorData.profile_image}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="cover_image">
              <strong>Cover Image</strong>
            </label>
            <input
              type="text"
              name="cover_image"
              placeholder="Add a cover image for your shop"
              value={newCreatorData.cover_image}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="submit">Sign-Up</button>
        </form>
        <Link to="/creator/login" className="login-link">
              Already Signed Up?
            </Link>
        <div className="error-message-createUser">
          <p>{errorMessage}</p>
  
        </div>
      </div>
    </div>
  );
};

export default CreatorSignUp;
