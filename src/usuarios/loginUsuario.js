import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userArea.css';

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
                navigate("/pagina-desejada"); // Substituir pelo caminho desejado ao criar as paginas especificas
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
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Entre com seu username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
