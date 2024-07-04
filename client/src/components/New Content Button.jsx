import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewContentButton = ({ creator_id }) => {
  const navigate = useNavigate();
  const handleNew = () => {
    navigate(`/myshop/new/${creator_id}`);
  };

  return (
    <button onClick={handleNew}>Add New Content</button>
  );
};

export default NewContentButton;
