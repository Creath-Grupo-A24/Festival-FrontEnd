import React, { useState, useEffect } from "react";
import "./ViewCompany.css";
import { useNavigate } from "react-router-dom";
import { AuthServiceFactory } from "../../../services/auth.service";
import { Helmet } from "react-helmet";
import ViewUser from "./ViewUser";

const ViewCompany = ({ user, company }) => {
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [companyUsers, setCompanyUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [])

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
