import React from "react";
import { useNavigate } from "react-router-dom";

const UserMenuDropdown = ({ onLogout, style = {} }) => {
  const navigate = useNavigate();

  const handleGoToUserProfile = () => {
    navigate("/userprofile");
  };

  return (
    <div className="user-menu-dropdown">
      <button className="nav_link" style={style} onClick={handleGoToUserProfile}>
        Minha Conta
      </button>
      <button className="nav_link" style={style} onClick={onLogout}>
        Sair
      </button>
    </div>
  );
};

export default UserMenuDropdown;
