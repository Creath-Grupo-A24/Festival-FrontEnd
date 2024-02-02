import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userArea.css';
import fest from './creatFest.PNG';

const UserArea = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Função para autenticar usuário
    const authenticateUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8091/v1/sign/in', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const user = await response.json();
            return user;
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            throw error;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const user = await authenticateUser(username, password);
            if (user) {
                console.log("Usuário autenticado com sucesso:", user);
                localStorage.setItem('user', JSON.stringify(user.user));
                localStorage.setItem('token', user.token);

                navigate("/"); 
            }
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault(); 
        navigate("/registration"); // Navega para a página de registro
    };

    return (
        <div className="userArea">
            <form onSubmit={handleLogin}>
                <img className='festLogo' alt='fest' src={fest}></img>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Entre com seu username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Senha</label>
                <input 
                    type="password" 
                    placeholder="Entre com sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='login' type="submit">Entrar</button>
            </form>
            <div className='registerBtn'><label>Não tem conta?</label>
            <button className='register' onClick={handleRegister}>Cadastre-se</button></div>
        </div>    
    );
};

export default UserArea;
