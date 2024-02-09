import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { loginHandler } from "../../../handlers/auth.handler";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const handleSubmit = async function (e) {
    const error = await loginHandler(e);
    if (error) navigate("/signin");
    else navigate("/");
  };

  let navigate = useNavigate();

  return (
      <div className="form-area">
        <Helmet>
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Digite seu nome de usuário"
              autoComplete="username"
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="password"
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button className="login" type="submit">
            Entrar
          </button>
          <div className="register-link">
            <span>
              Não tem conta? <Link to="/signup">Cadastre-se</Link>
            </span>
          </div>
        </form>
      </div>
  );
};

export default LoginPage;
