import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateAccount = (props) => {
  const [newCreatorData, setNewCreatorData] = useState({
    name:"",
    email:"",
    username:"",
    password:"",
    profile_image: "",
    coverImage: "",
    bio:""
  })
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = { userName, password, firstName, lastName, description, userImage };
    handleCreateUser(userObj);
    setUserName("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setDescription("");
    setUserImage("");
  };

  const handleCreateUser = async (userObj) => {
    try {
      const response = await fetch(URL, {
        method: "post",
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
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while creating the account.");
    }
  };

  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    await fetch(`/creator/sign-up`, {})
  }

  //print error message
  return (
    <div className="sign-up">
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"><strong>Username</strong></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleInput}
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
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            value={description}
            placeholder="About you :)"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <textarea
            value={userImage}
            placeholder="Your Profile image link"
            onChange={(e) => setUserImage(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <div className="error-message-createUser">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default CreateAccount;