import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditContent = ({ content_id }) => {
  const navigate = useNavigate();
  console.log(content_id)
  const handleEdit = () => {
    navigate(`/shop/update-content/${content_id}`);
  };

  return (
    <button onClick={handleEdit}>Edit</button>
  );
};

export default EditContent;
