import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewContentForm = () => {
  const { creator_id } = useParams();
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  const [newContentData, setNewContentData] = useState({
    title: "",
    description: "",
    file_url: "",
    price: "",
    sold: false,
    buyer_id: null,
    creator_id: creator_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/content/new/${creator_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Content added successfully:", data);
        navigate(`/myshop/${creator_id}`);
      })
      .catch((error) => {
        console.error("Error adding new content:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContentData({
      ...newContentData,
      [name]: value,
    });
  };


  return (
    <div className="new-content-form">
      <h2>Add New Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newContentData.title} // Pre-filled with contentData.title
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newContentData.description} // Pre-filled with contentData.description
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="file_url">File URL:</label>
          <input
            type="text"
            id="file_url"
            name="file_url"
            value={newContentData.file_url} // Pre-filled with contentData.file_url
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newContentData.price} // Pre-filled with contentData.price
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add New Content</button>
      </form>
    </div>
  );
};

export default NewContentForm;
