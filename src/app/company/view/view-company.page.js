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
            if (company == null && user && user.roles && user.roles.includes("MANAGER")) {
                navigate("/company/create");
            }
            const fetchUsers = async () => {
                if (!company) return
                const users = await AuthServiceFactory.create().getUsersByCompany(company.id)
                //users.filter((user) => !user.roles.includes("MANAGER"));
                setCompanyUsers(users || [])
                setLoading(false);
            }
            fetchUsers()
        } catch (error) {
            console.error("Erro ao buscar usuários da companhia:", error);
        }
    }, [company, navigate, user])

    return (
        <div>
            <div className="view-company">
                <h1>{company && company.name}</h1><br />
            </div>
            <div className="users-container">
                {loading ? (
                    <div className="loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    companyUsers.map((user, index) => (
                        <ViewUser key={index} user={user} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewCompany;
