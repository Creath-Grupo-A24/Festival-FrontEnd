import React, { useState, useEffect } from "react";
import "./view-company.css";
import { useNavigate } from "react-router-dom";
import { AuthServiceFactory } from "../../../services/auth.service";
import ViewUser from "../../../components/user/view-user.component";

const ViewCompany = ({ user, company }) => {
  const [companyUsers, setCompanyUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (
        company == null &&
        user &&
        user.roles &&
        user.roles.includes("MANAGER")
      ) {
        navigate("/company/create");
      }
      const fetchUsers = async () => {
        if (!company) return;
        const users = await AuthServiceFactory.create().getUsersByCompany(
          company.id
        );

        const usersByRole = {};
        users.forEach((user) => {
          user.roles.forEach((role) => {
            if (!usersByRole[role]) {
              usersByRole[role] = [];
            }
            usersByRole[role].push(user);
          });
        });

        setCompanyUsers(usersByRole);
        setLoading(false);
      };
      fetchUsers();
    } catch (error) {
      console.error("Erro ao buscar usuários da companhia:", error);
    }
  }, [company, navigate, user]);

  return (
    <div className="users-container">
      {loading ? (
        <div className="full-screen">
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="company-name">{company.name}</h1>
          <div className="users-by-roles">
            {Object.keys(companyUsers)
              .sort((a, b) => {
                const roleOrder = ["MANAGER", "TEACHER", "DANCER"];
                return roleOrder.indexOf(a) - roleOrder.indexOf(b);
              })
              .map((role, index) => (
                <div key={index}>
                  <h2 className="role-type">{role}</h2>
                  <div className="role-container">
                    {companyUsers[role].map((u, userIndex) => (
                      <ViewUser className="user" key={userIndex} user={u} userRole={user.roles}/>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCompany;
