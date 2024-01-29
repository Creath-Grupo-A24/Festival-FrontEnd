// No componente FestivalDetails
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFestivalById } from './festivalService';

const FestivalDetails = () => {
  let { id } = useParams(); // Certifique-se de que a variável aqui corresponde ao nome do parâmetro definido na sua rota
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        const fetchedFestival = await getFestivalById(id);
        setFestival(fetchedFestival);
      } catch (error) {
        console.error('Erro ao buscar detalhes do festival', error);
      }
    };

    fetchFestivalDetails();
  }, [id]);

  if (!festival) {
    return <div>Festival não encontrado.</div>;
  }

  return (
    <div>
      <h1>{festival.nome}</h1>
      <p>{festival.descricao}</p>
      <p>Data: {festival.data}</p>
      <p>Local: {festival.local}</p>
      {/* Outros detalhes que você desejar mostrar */}
    </div>
  );
};

export default FestivalDetails;
