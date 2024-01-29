import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from './festivalService'; // Importe a função para buscar os festivais
import './festivais.css';

const Festivais = () => {
  const [festivais, setFestivais] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        setFestivais(response.data);
      } catch (error) {
        console.error('Erro ao buscar festivais', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="festivais-container">
      {festivais.map(festival => (
        <Link to={`/festival/${festival.id}`} key={festival.id} className="festival-item-link">
          <div className="festival-item">
            <img src={festival.imagem} alt={festival.nome} />
            <div className="festival-info">
              <h3>{festival.nome}</h3>
              <p>{festival.id}</p>
              <p>{festival.descricao}</p>
              <p>Data: {festival.data}</p>
              <p>Local: {festival.local}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Festivais;
