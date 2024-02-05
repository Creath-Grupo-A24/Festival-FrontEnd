import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userArea.css';
import fest from './creatFest.PNG';
import {authenticateUser, getUserByToken} from './userService';

const UserArea = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const user = await authenticateUser(username, password);
            if (user) {
                console.log("Usuário autenticado com sucesso:", user);
                const authResponse = await authenticateUser(username, password);
                if (authResponse && authResponse.token) {
                    console.log("Autenticação bem-sucedida, token:", authResponse.token);
                    localStorage.setItem('token', authResponse.token);

                    const userDetails = await getUserByToken(authResponse.token);
                    console.log("Detalhes do usuário obtidos:", userDetails);

                    localStorage.setItem('user', JSON.stringify(userDetails)); 
                    
                    navigate("/"); 
                }
            }
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault(); 
        navigate("/registration");
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
