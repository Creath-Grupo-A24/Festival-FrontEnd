import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userArea.css';

const authenticateUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8091/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        throw error;
    }
};

const UserArea = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const user = await authenticateUser(email, password);
            if (user) {
                console.log("Usuário autenticado com sucesso:", user);
            }
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault(); 
        navigate("/registration");
    };

    return (
        <div className="userArea">
            <form onSubmit={handleLogin}>
                <label>Login</label>
                <input 
                    type="email" 
                    placeholder="Entre com seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Senha</label>
                <input 
                    type="password" 
                    placeholder="Entre com sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleRegister}>Ir para Cadastro</button>
        </div>    
    );
};

export default UserArea;
