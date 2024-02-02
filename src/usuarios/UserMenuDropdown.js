import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenuDropdown = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleGoToUserProfile = () => {
    navigate('/userprofile');
  };

  return (
    <div className="user-menu-dropdown">
      <button onClick={handleGoToUserProfile}>Minha Conta</button>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
};

export default UserMenuDropdown;
