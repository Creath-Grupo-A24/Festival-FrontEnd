import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
// Components
import Home from './components/festivais';
import User from './usuarios/loginUsuario';
import Cadastro from './usuarios/cadastroUsuario';
import FestivalDetails from './components/festivalDetails';
import UserMenuDropdown from './usuarios/UserMenuDropdown';
import Subscription from './components/eventSub';
import EventCreate from './components/eventCreate';
import UserArea from './userArea/userArea';
import Data from './userArea/userData';
import CreateCompany from './userArea/createCompany';
import SubscriptionArea from './userArea/subscriptionsArea';
import Details from './userArea/detailsSubs';
import UploadForm from './rules/uploadRules';

function App() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userString = user ? JSON.parse(user) : {};

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle = {
    backgroundColor: scrolling ? "rgba(10, 10, 10, .9)" : "transparent",
  };

  //handle req
  console.log(user);
  const handleUserAreaClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/loginusuario");
    }
  };

  const handleEventCreate = () => {
    if (userString.roles && userString.roles.includes("ADMIN")) {
      navigate("/create");
    } else {
      alert("Apenas administrador pode acessar!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <div className="App">
      <nav className="header" style={headerStyle}>
        <Link to={"/"}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
          />
        </Link>
        <div className="nav-links">
          <Link className="nav_link" to="/">
            Home
          </Link>
          {userString.roles && userString.roles.includes("ADMIN") && (
            <button
              className="btnEvento nav_link"
              onClick={handleEventCreate}
            >
              Criar Evento
            </button>
          )}
          <button
            className="btnArea nav_link"
            onClick={handleUserAreaClick}
          >
            Área Usuário
          </button>
          {user != null && (
            <UserMenuDropdown onLogout={handleLogout} />
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginusuario" element={<User />} />
        <Route path="/registration" element={<Cadastro />} />
        <Route path="/festival/:id" element={<FestivalDetails />} />
        <Route path='/inscricao/:id' element={<Subscription />} />
        <Route path='/create' element={<EventCreate />}/>
        <Route path="/userarea" element={<UserArea />}>
          <Route path="data" element={<Data />} />
          <Route path="createcompany" element={<CreateCompany />} />
          <Route path='subscriptionlist' element={<SubscriptionArea/>}/>
          <Route path='details' element={<Details/>}/>
        </Route>
        <Route path='uprules' element={<UploadForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
