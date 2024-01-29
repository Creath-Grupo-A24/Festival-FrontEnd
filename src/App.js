import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
// Components
import Home from './components/festivais';
import User from './usuarios/areaUsuario';
import Cadastro from './usuarios/cadastroUsuario'
import FestivalDetails from './components/festivalDetails'; // Importe o componente de detalhes do festival

function App() {
  return (
    <div className="App">   
      <nav>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <Link to='/areaUsuario'>Área Usuário</Link>
        </div>
      </nav>   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/areausuario' element={<User />} />
        <Route path="/festival/:id" element={<FestivalDetails />} />
        <Route path="/registration" element={<Cadastro />} />
      </Routes>      
    </div>
  );
}

export default App;
