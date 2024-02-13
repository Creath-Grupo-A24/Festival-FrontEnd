import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dropdown.css";
import Cookies from "js-cookie";

const UserDropdown = ({ setExistsUser, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setExistsUser(false);
    Cookies.remove("token");
  };

  return (
    <div className="user-dropdown">
      <div
        className="user-icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaUserCircle />
      </div>
      {isOpen && (
        <div
          className="dropdown-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            <li className="username">
              {user.username}
            </li>
            <li>
              <Link className="link" to="/profile">
                Perfil
              </Link>
            </li>
            <li>
              <Link className="link" to="/signin" onClick={handleLogout}>
                Sair
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
