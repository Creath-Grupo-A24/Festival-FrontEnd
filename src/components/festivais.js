import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from './festivalService';
import './festivais.css';

const Festivais = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents(0, 10, '', 'time', 'ASC');
        console.log(response.items);
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
              <h3>{evento.name}</h3>
              <p>{evento.description}</p>
              <p>Data: {evento.time}</p> 
              <p>Local: {evento.place}</p>
              <h4>Categorias:</h4>
              <ul>
                {evento.categories.map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Festivais;
