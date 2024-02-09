import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { loginHandler } from '../../../handlers/auth.handler';

const LoginPage = () => {
    const handleSubmit = async function (e) {
        const error = await loginHandler(e);
        if (error) navigate('/signin')
        else navigate('/');
    };

    let navigate = useNavigate();

    return (
        <div className="form-area">
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Usuário</label>
                    <input
                        type="text"
                        name='username'
                        placeholder="Digite seu nome de usuário"
                        autoComplete='username'
                    />
                </div>
                <div className='form-group'>
                    <label>Senha</label>
                    <input
                        name='password'
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete='password'
                    />
                </div>
                <button className='login' type="submit">Entrar</button>
            </form>
            <span>Não tem conta? <Link to="/signup">Cadastre-se</Link></span>
        </div>
    );
};

export default LoginPage;