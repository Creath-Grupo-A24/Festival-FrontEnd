import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from './festivalService'; 
import { getSubscriptionByEventId } from './eventService';
import './festivalDetails.css';
import UploadForm from '../rules/uploadRules';
import {downloadRules} from './festivalService';

const FestivalDetails = () => {
  let { id } = useParams();
  const [festival, setFestival] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userString = user ? JSON.parse(user) : {};
  const [showUploadForm, setShowUploadForm] = useState(false); 

  const handleShowUploadForm = () => {
      setShowUploadForm(true);
  };

  const handleDownload = async (id) => {
    try {
          const response = await downloadRules(id);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'rules.pdf'); 
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
      } catch (error) {
          console.error('Erro ao baixar as regras:', error);
      }
  };


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

  const fetchSubscriptions = async () => {
    try {
      const response = await getSubscriptionByEventId(id, {});
      console.log(response.data.items);
      setSubscriptions(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
    }
  };

  const redirectToInscriptionPage = () => {
    console.log("Roles",user);
    if (user) {
      const userString = user ? JSON.parse(user) : null;
      if (userString && userString.roles && (userString.roles.includes('MANAGER') || userString.roles.includes('DANCER'))){
        console.log(token);
        navigate(`/inscricao/${id}`);
      }
      else{
        alert('Apenas gerentes e dançarinos podem realizar inscrição, voce sera redirecionado para a pagina inicial!');
        navigate('/');
      }
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
          <li key={index}>{categoria.type}</li> 
        ))}
      </ul>
      <button onClick={redirectToInscriptionPage} className="btn-inscription">Inscrever no Festival</button>
      <button onClick={fetchSubscriptions}>Ver inscrições</button> 
      {userString.roles && userString.roles.includes('ADMIN') && (
        <button onClick={handleShowUploadForm}>Subir regras</button>
      )}
      {showUploadForm && <UploadForm id={id} />} 
      {(userString.roles && (userString.roles.includes('ADMIN') || userString.roles.includes('MANAGER'))) && (
          <button onClick={handleDownload}>Download regras</button>
      )}

      {subscriptions.length > 0 && (
        <div className="subscription-details">
          {subscriptions.map(subscription => (
            <div key={subscription.id}>
              <form>
                <h3>{subscription.name}</h3>
                <p>{"Descrição: "+subscription.description}</p>
                <p>{"ID da inscrição"+subscription.id}</p>
                <p>{"Categories:"+subscription.category_id}</p>
                <p>{"Horario: "+subscription.time}</p>
                <p>{"Staff: "+Array.isArray(subscription.staff) ? subscription.staff.join(", ") : ''}</p>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FestivalDetails;
