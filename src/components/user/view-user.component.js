import React, { useState } from "react";
import "./view-user.css";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";

const ViewUser = ({ user, userRole }) => {
  const [expandedUser, setExpandedUser] = useState(false);

  const toggleDetails = () => {
    setExpandedUser((prevUser) => !prevUser);
  };

  
  return (
    <div
      className="user"
      onClick={() => toggleDetails()}
      style={{ height: expandedUser ? (userRole && userRole.includes("MANAGER") ? "120px" : "80px") : "60px" }}
    >
      <FaUserCircle className="unique-user-icon" />
      <span className="username">{user.username}</span>
      <br />
      <span className="real-name">{user.name}</span>
      <br />
      <span className="arrow">{expandedUser ? "▼" : "►"}</span>

      {expandedUser && (
        <div className="user_details">
          <span className="email">{user.email}</span>
          {userRole && userRole.includes("MANAGER") &&
            <>
              <br /><span className="cpf">
                {user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
              </span><br /><span className="birthdate">
                {moment(user.birth_date).format("DD/MM/yyyy")}
              </span>
            </>
          }
        </div>
      )}
    </div>
  );
};

export default ViewUser;
