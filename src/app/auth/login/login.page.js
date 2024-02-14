import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AuthServiceFactory } from "../../../services/auth.service";
import { loginHandler } from "../../../handlers/auth.handler";
import { getCompany } from "../../../userArea/areaService";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

const LoginPage = ({ setExistsUser, setUser, setCompany }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) navigate("/profile");
  });

  const handleSubmit = async function (e) {
    const error = await loginHandler(e);
    if (error) navigate("/signin");
    else {
      setExistsUser(true);
      const fetchUser = async () => {
        const user = await AuthServiceFactory.create().getUser();
        setUser(user);
        if (user.company_id != null) {
          const company = await getCompany(user.company_id);
          setCompany(company);
        }
      };
      fetchUser();
      navigate("/");
    }
  };

  return (
    <div className="login-form-area">
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            autoComplete="username"
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="login-form-group">
          <input
            name="password"
            type="password"
            placeholder="Senha"
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
