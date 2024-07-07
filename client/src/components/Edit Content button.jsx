import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditContent = ({ content_id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myshop/update-content/${content_id}`);
  };

  return (
    <button className="edit-button" onClick={handleEdit}>Edit Content</button>
  );
};

export default EditContent;
