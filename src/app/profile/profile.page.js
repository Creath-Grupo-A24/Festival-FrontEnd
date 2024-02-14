import React from "react";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import "./profile.css";

const Profile = ({ user, company }) => {
  return (
    <div className="container">
      <div className="rows">
        <div className="row">
          <div className="icon">
            <FaUserCircle className="icon-image" />
            <div className="roles">
              <ul className="roleList">
                {user.roles.map((role, index) => (
                  <li className="role" key={index}>
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="top">
            <h4 className="name">{user.name}</h4>
            <p className="info">Nome de usuário: {user.username}</p>
            <p className="info">Email: {user.email}</p>
            <p className="info">Telefone: {user.phone}</p>
            <p className="info">
              Data de Nascimento: {moment(user.birth_date).format("DD/MM/yyyy")}
            </p>
            <p className="info">
              Companhia:{" "}
              {company ? company.name : "Não associado a companhia"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
