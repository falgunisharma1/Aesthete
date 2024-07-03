import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CreatorShop = () => {
  const [creatorData, setCreatorData] = useState({});
  const { creatorid } = useParams();

  useEffect(() => {
    fetch(`/creator/${creatorid}`)
      .then((response) => response.json())
      .then((data) => {
        setCreatorData(data);
      })
      .catch((error) => {
        console.error("Error fetching creator data:", error);
      });
  }, [creatorid]); // Fetch data when id changes

  useEffect(() => {
    console.log(creatorData.profileImage);
  }, [creatorData]);

  return (
    <div className="creator-shop">
      <div className="creator-info">
        <img
          className="creator-profile-image"
          src={creatorData.profileImage} 
          alt={`${creatorData.name}'s profile`}
        />
        <div className="creator-details">
          <h2 className="creator-name">{creatorData.name}'s Shop</h2>
          <p className="creator-bio">{creatorData.bio}</p>
        </div>
      </div>
      <h3 className="content-title">Content Created:</h3>
      <div className="content-list">
        {creatorData.content &&
          creatorData.content.map((contentItem, index) => (
            <div key={index} className="content-item">
              <img
                src={contentItem.fileurl} // Ensure this matches the key from your backend
                alt={contentItem.title}
                className="content-image"
              />
              <div className="content-details">
                <p className="content-title">{contentItem.title}</p>
                <p className="content-description">Description: {contentItem.description}</p>
                <p className="content-price">Price: ${contentItem.price}</p>
                {contentItem.sold === false ? (
                  <button>Available</button>
                ) : (
                  <button>Sold</button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreatorShop;
