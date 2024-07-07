import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const URL = `${props.URL}users/login`;

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userObj = { userName, password };
      handleLogin(userObj);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleLogin = async (userObj) => {
    try {
      const response = await fetch(URL, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await response.json();
      if (data.userName) {
        setErrorMessage("");
        props.setCurrentUser(data);
        props.setUserId(data.user_Id);
        navigate("/hotels");
      } else {
        setErrorMessage(data || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="error-message-login">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Login;