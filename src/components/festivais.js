import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from './festivalService';
import {listRoles} from '../usuarios/userService';
import './festivais.css';

const Festivais = () => {
  const [eventos, setEventos] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents(0, 10, '', 'time', 'ASC');
        console.log(response.items);
        console.log(roles);
        setEventos(response.items || []); 
      } catch (error) {
        console.error('Erro ao buscar eventos', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="festivais-container">
      {eventos.map(evento => (
        <Link to={`/festival/${evento.id}`} key={evento.id} className="festival-item-link">
          <div className="festival-item">
            {/* <img src={evento.imagem} alt={evento.name} /> Imagem comentada ate estar disponivel*/}
            <div className="festival-info">
              <p>{evento.time}</p> 
              <h3>{evento.name}</h3>
              <p>{evento.description}</p>
              
              <h4>Categorias:</h4>
              <ul>
                {evento.categories.map((categoria, index) => (
                  <li key={index}>{categoria.type}</li>
                ))}
              </ul>
              <p>Local: {evento.place}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Festivais;
