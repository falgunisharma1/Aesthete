import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyNowButton from "./Buy Now Button";
import EditContent from "./Edit Content button"
import NewContentButton from "./New Content Button"

const ShopView = ({isCreatorView}) => {
  const [creatorData, setCreatorData] = useState({});
  const { creator_id } = useParams();
  useEffect(() => {
    fetch(`/creator/${creator_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCreatorData(data);
      })
      .catch((error) => {
        console.error('Error fetching creator data:', error);
      });
  }, [creator_id]);
  

  return (
    <div className="creator-shop">
      <div className="creator-info">
        <img
          className="creator-profile-image"
          src={creatorData.profile_image} 
          alt={`${creatorData.name}'s profile`}
        />
        <div className="creator-details">
          <h2 className="creator-name">{creatorData.name}'s Shop</h2>
          <p className="creator-bio">{creatorData.bio}</p>
        </div>
        {isCreatorView === true ? (
        <div className="new-content-button">
          <NewContentButton creator_id={creator_id}/>
        </div>):(null)}
      </div>
      <h3 className="content-title">Content Created:</h3>
      <div className="content-list">
        {creatorData.content &&
          creatorData.content.map((contentItem, index) => (
            <div key={index} className="content-item">
              <img
                src={contentItem.file_url} // Ensure this matches the key from your backend
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
                
                  {isCreatorView === true ? (
                    <div>
                    <EditContent content_id={contentItem.content_id}/>
                    <button>Delete</button>
                    </div>
                  ):(<BuyNowButton/>)}
                
                
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopView;
