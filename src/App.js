import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
// Components
import Home from './components/festivais';
import User from './usuarios/loginUsuario';
import Cadastro from './usuarios/cadastroUsuario';
import FestivalDetails from './components/festivalDetails';
import UserMenuDropdown from './usuarios/UserMenuDropdown';
import Subscription from './components/eventSub';

function App() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  console.log(user);
  const handleUserAreaClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/loginusuario');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setShowUserMenu(false); 
    navigate('/');
  };

  return (
    <div className="App">
      <nav>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <button className='btnArea' onClick={handleUserAreaClick}>Área Usuário</button>
          {showUserMenu && <UserMenuDropdown onLogout={handleLogout}/>}
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginusuario' element={<User />} />
        <Route path='/registration' element={<Cadastro />} />
        <Route path="/festival/:id" element={<FestivalDetails />} />
        <Route path='/inscricao/:id' element={<Subscription />} />
      </Routes>
    </div>
  );
}

export default App;
