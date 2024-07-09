import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BuyerHomePage = () => {
  const [backendData, setBackendData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendUrl}/buyer/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.valid) {
          console.log(data);
          setBackendData(data.creatorResult);
        } else {
          navigate("/buyer/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    console.log(backendUrl);
  }, []);

  return (
    <div className="buyer_home_page">
      {backendData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        backendData.map((user, i) => (
          <Link
            to={`/shop/${user.creator_id}`}
            key={i}
            className="creator_list"
          >
            <div className="creator_info">
              <img
                className="creators_images"
                src={user.profile_image}
                alt={`${user.name}'s profile`}
              />
              <div>
                <p className="creator_name">{user.name}</p>
                <p className="creator_bio">{user.bio}</p>
              </div>
            </div>
            <div className="creator_content_container">
              {user.content.map((contentItem, j) => (
                <img
                  key={j}
                  className="creator_content"
                  src={contentItem.file_url}
                  alt={contentItem.title}
                />
              ))}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BuyerHomePage;
