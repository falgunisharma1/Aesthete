import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/${props.isBuyer ? 'buyer' : 'creator'}/login`;



  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(loginData);
  };

  
  const handleLogin = async (userObj) => {
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });
        
      const data = await response.json();

      console.log(window.sessionStorage)
      if (data.user && data.user.username) {
        window.sessionStorage.setItem("userId", JSON.stringify({
          userId: data.user.user_id,
          buyerId: data.user.buyer_id,
          creatorId: data.user.creator_id,
        }));
        
        if (!props.isBuyer) {
          navigate(`/myshop/${data.creator_id}`);
        } else {
          navigate(`/`);
        }
       
      } else {
        setErrorMessage(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-outside">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <label htmlFor="username" className="label-username-password-login">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password" className="label-username-password-login">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleInput}
            />
          </div>
          <button type="submit" >Login</button>
          {props.isBuyer ? (
            <Link to="/buyer/signup" className="create-account-link">
              Create an Account
            </Link>
          ) : (
            <Link to="/creator/signup" className="create-account-link">
              Create an Account
            </Link>
          )}
        </form>
        {errorMessage && (
          <div className="error-message-login">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};



export default Login;
