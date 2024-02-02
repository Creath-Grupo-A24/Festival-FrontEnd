import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from './festivalService';
import './festivalDetails.css';

const FestivalDetails = () => {
  let { id } = useParams();
  const [festival, setFestival] = useState(null);
  const navigate = useNavigate(); // Inicializa o useNavigate
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

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

  const redirectToInscriptionPage = () => {
    if (user) {
      console.log(token);
      navigate(`/inscricao/${id}`);
    } else {
      alert('Faça o login antes de continuar, você sera enviado para a pagina de login');
      navigate('/loginusuario');
    }
  };

  if (!festival) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <div className="festival-details">
      <h1>{festival.name}</h1>
      <p>{festival.description}</p>
      <p>Data: {festival.time}</p> 
      <p>Local: {festival.place}</p>
      <ul>
        {festival.categories.map((categoria, index) => (
          <li key={index}>{categoria}</li> 
        ))}
      </ul>
      <button onClick={redirectToInscriptionPage} className="btn-inscription">
        Inscrever no Festival
      </button>
    </div>
  );
};

export default FestivalDetails;
