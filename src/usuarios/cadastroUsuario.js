import React, { useState } from 'react';
import './cadastroUsuario.css';
import { useNavigate } from 'react-router-dom';

// Função para registrar usuário
const registerUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:8091/v1/sign/up', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
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
    const [birthDate, setBirthDate] = useState('');
    const [roleId, setRoleId] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Formata a data para o formato 'dd/MM/yyyy'
        const formattedBirthDate = birthDate ? new Date(birthDate + 'T00:00:00').toLocaleDateString('pt-BR', {
            timeZone: 'UTC' 
        }) : '';
        const userData = {
            username,
            email,
            password: senha,
            name,
            birth_date: formattedBirthDate.toString(),
            role_id: parseInt(roleId, 10),
            cpf,
            phone
        };

        console.log('Dados enviados:', JSON.stringify(userData));


        try {
            const response = await registerUser(userData);
            if (response) {
                console.log('Dados do usuário cadastrados com sucesso', response);
                navigate('/loginusuario');
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
                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Usuário (Role ID):</label>
                    <select
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        required
                    >
                        <option value="">Selecione um Tipo</option>
                        <option value="1">ADM</option>
                        <option value="2">DIR</option>
                        <option value="3">DAN</option>
                        <option value="4">COR</option>
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
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        //required
                    />
                </div>
                <button className='btCadastra' type="submit">Cadastrar</button>
                <button className='btVolta' onClick={() => navigate('/loginusuario')}>Voltar para login</button>
            </form>
        </div>
    );
}

export default CadastroUsuario;
