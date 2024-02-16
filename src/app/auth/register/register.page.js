import React, { useState, useEffect } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthServiceFactory } from "../../../services/auth.service";
import { registerHandler } from "../../../handlers/auth.handler";
import { Helmet } from "react-helmet";
import { CompanyServiceFactory } from "../../../services/company.service";

function RegisterPage({ setExistsUser, setUser, setCompany }) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    if (Cookies.get("token")) navigate("/profile");
  });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const fetchedRoles = await AuthServiceFactory.create().listRoles();
                setRoles(fetchedRoles);
            } catch (error) {
                console.error('Erro ao buscar roles:', error);
            }
        };

        fetchRoles();
    }, []);

  const handleSubmit = async function (e) {
    const error = await registerHandler(e);
    if (error) {
      alert("Erro ao cadastrar usuário!");
      e.target.reset();
    } else {
      setExistsUser(true);
      const fetchUser = async () => {
        const user = await AuthServiceFactory.create().getUser();
        setUser(user);
        if (user.company_id != null) {
          const company = await CompanyServiceFactory.create().getCompany(user.company_id);
          setCompany(company);
        }
      };
      fetchUser();
      navigate("/");
    }
  };

    return (
        <div className="register-form-area">
            <Helmet>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className='register-form-group'>
                    <label>Usuário:</label>
                    <input
                        name='username'
                        type="text"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Email:</label>
                    <input
                        name='email'
                        type="email"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Senha:</label>
                    <input
                        name='password'
                        type="password"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Nome Completo:</label>
                    <input
                        name='name'
                        type="text"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Data de Nascimento:</label>
                    <input
                        name='birth_date'
                        type="date"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Tipo de Usuário:</label>
                    <select
                        name='role_id'
                        required
                    >
                        <option value="">Selecione um Tipo</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.description}</option>
                        ))}
                    </select>
                </div>
                <div className='register-form-group'>
                    <label>CPF:</label>
                    <input
                        name='cpf'
                        type="text"
                        required
                    />
                </div>
                <div className='register-form-group'>
                    <label>Telefone:</label>
                    <input
                        name='phone'
                        type="text"
                    />
                </div>
                <button className="cadastrar" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
