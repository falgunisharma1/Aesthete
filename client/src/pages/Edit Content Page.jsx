import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateContentForm = () => {
  const { content_id } = useParams();
  const navigate = useNavigate();

  const [contentData, setContentData] = useState({
    title: "",
    description: "",
    file_url: "",
    price: 0.0,
    creator_id:""
  });

  useEffect(() => {
    fetch(`/content/${content_id}`)
      .then((response) => response.json())
      .then((data) => {
        setContentData({
          title: data.title,
          description: data.description,
          file_url: data.file_url,
          price: data.price,
          creator_id: data.creator_id
        });
      })
      .catch((error) => {
        console.error("Error fetching content data:", error);
      });
  }, [content_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData({
      ...contentData,
      [name]: value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contentData);

    fetch(`/content/update/${content_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentData),
    })
      .then((response) => {
        response.json();
        
      })
      .then((data) => {
        console.log("Content updated successfully:", data);
        navigate(`/myshop/${contentData.creator_id}`);
      })
      .catch((error) => {
        console.error("Error updating content:", error);
      });
  };

  return (
    <div className="update-content-form">
      <h2>Update Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={contentData.title} // Pre-filled with contentData.title
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={contentData.description} // Pre-filled with contentData.description
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="file_url">File URL:</label>
          <input
            type="text"
            id="file_url"
            name="file_url"
            value={contentData.file_url} // Pre-filled with contentData.file_url
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
            value={contentData.price} // Pre-filled with contentData.price
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Content</button>
      </form>
    </div>
  );
};

export default UpdateContentForm;
