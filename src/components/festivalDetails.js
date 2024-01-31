import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from './festivalService'; 

const FestivalDetails = () => {
  let { id } = useParams();
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        const fetchedFestival = await getEventById(id);
        setFestival(fetchedFestival);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento', error);
      }
    };

    fetchFestivalDetails();
  }, [id]);

  if (!festival) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <div>
      <h1>{festival.name}</h1>
      <p>{festival.description}</p>
      <p>Data: {festival.time}</p> 
      <p>Local: {festival.place}</p>
      <ul>
        {festival.categories.map((categoria, index) => (
          <li key={index}>{categoria}</li> 
        ))}
      </ul>
    </div>
  );
};

export default FestivalDetails;
