import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import './userArea.css';

const UserArea = () => {
    const navigate = useNavigate();
    const [userString, setUserString] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'user') {
                setUserString(JSON.parse(event.newValue || '{}'));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="box">
            <nav>
                <Link to='/userarea/data'>Dados</Link>
                {userString.roles && userString.roles.includes('MANAGER') && !userString.company_id && (
                    <Link to="/userarea/createcompany">Criar Companhia</Link>
                )}
                <Link to="/userarea/subscriptionlist">Lista de inscrições</Link>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default UserArea;
