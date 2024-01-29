import React, { useState } from 'react';
import './cadastroUsuario.css';
import { useNavigate } from 'react-router-dom';

// Função para registrar usuário
const registerUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8091/auth/signup', {
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
        console.error("Erro ao cadastrar:", error);
        throw error;
    }
};

function CadastroUsuario() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [name, setName] = useState('');
    const [tipo, setTipo] = useState(''); // Alterando para 'tipo'
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        // Redireciona para o componente AreaUsuario ao clicar em "Voltar"
        navigate("/areausuario");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            username,
            email,
            senha,
            name,
            roles: tipo, // Atualizado para 'tipo'
            cpf,
            birth_date: birthDate // Formato esperado: 'AAAA-MM-DD'
        };

        try {
            const response = await registerUser(email, senha);
            if (response) {
                console.log('Dados do usuário cadastrados com sucesso', response);
                // Implemente o que deve acontecer após o cadastro bem-sucedido
            }
        } catch (error) {
            console.error('Erro ao enviar dados do usuário:', error);
        }
    };

    return (
        <div className="cadastro-container">
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Usuário:</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="">Selecione um Tipo</option>
                        <option value="ADM">ADM</option>
                        <option value="DIR">DIR</option>
                        <option value="DAN">DAN</option>
                        <option value="COR">COR</option>
                    </select>
                </div>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>
                <button className='btCadastra' type="submit">Cadastrar</button>
                <button className='btVolta' onClick={handleLogin}>Voltar para login</button>
            </form>
        </div>
    );
}

export default CadastroUsuario;
