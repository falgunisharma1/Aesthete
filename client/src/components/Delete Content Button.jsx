import React from "react";


const DeleteButton = ({ content_id }) => {
  
  const deleteContent = async () => {
    try {
      const response = await fetch(`/content/delete/${content_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const message = await response.json();
      console.log(message);
      window.location.reload();

    } catch (err) {
      console.error("Error deleting content:", err);
    }

  };

  return <button className="delete-button" onClick={deleteContent}>Delete Content</button>;
};

export default DeleteButton;
