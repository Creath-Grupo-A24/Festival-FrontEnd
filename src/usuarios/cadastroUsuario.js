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

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function validarNumeroTelefone(numero) {
    // Regex para validar número de telefone no formato (XX) 9XXXX-XXXX
    const padraoTelefone = /^\d{2}9\d{8}$/;
    return padraoTelefone.test(numero.replace(/[^0-9]+/g, ''));
}

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

        if (!validarCPF(cpf)) {
            alert('CPF inválido!');
            return; // Interrompe a função se o CPF for inválido
        }

        if (!validarNumeroTelefone(phone)) {
            alert('Número de telefone inválido!');
            return; // Interrompe a função se o telefone for inválido
        }

        const userData = {
            username,
            email,
            password: senha,
            name,
            birth_date: formattedBirthDate.toString(),
            role_id: parseInt(roleId, 10),
            cpf,
            phone: phone || null
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
                        <option value="3">COR</option>
                        <option value="4">DAN</option>
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
