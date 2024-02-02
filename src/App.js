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
import EventCreate from './components/eventCreate';

function App() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const userString = user ? JSON.parse(user) : {}; 

  console.log(user);
  const handleUserAreaClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/loginusuario');
    }
  };

  const handleEventCreate = () => {
    if (userString.roles && userString.roles.includes('ADMIN')) {
      navigate('/create'); 
    } else {
      alert('Apenas administrador pode acessar!');
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
          <button className='btnEvento' onClick={handleEventCreate}>Criar Evento</button>
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
        <Route path='/create' element={<EventCreate/>}/>
      </Routes>
    </div>
  );
}

export default App;
