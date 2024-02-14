import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthServiceFactory } from '../services/auth.service';
import './userArea.css';

const UserArea = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const userService = AuthServiceFactory.create();

        async function fetchAndSetUser() {
            try {
                const userObject = await userService.getUser();
                setUser(userObject);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchAndSetUser();
    }, []);

    return (
        <div className="box">
            <nav>
                <Link to='/profile/data'>Dados</Link>
                {user && user.roles && user.roles.includes('MANAGER') && !user.company_id && (
                    <Link to="/profile/createcompany">Criar Companhia</Link>
                )}
                {user && user.roles.includes('ADMIN') && (
                    <Link to="/profile/create">Criar Evento</Link>   
                )}
                <Link to="/profile/invite">Convites</Link>
                <Link to="/profile/subscriptionlist">Lista de inscrições</Link>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default UserArea;
