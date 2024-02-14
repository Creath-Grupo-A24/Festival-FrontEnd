import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthServiceFactory } from '../services/auth.service';
import { SubscriptionServiceFactory } from '../services/subscription.service';
import UploadForm from '../rules/uploadRules';
import './festivalDetails.css';
import { EventServiceFactory } from '../services/event.service';

const FestivalDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const eventService = EventServiceFactory.create();
  const subscriptionService = SubscriptionServiceFactory.getInstance('http://localhost:8091/v1/subscription');

  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        const fetchedFestival = await eventService.getEventById(id);
        setFestival(fetchedFestival);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento', error);
      }
    };

    fetchFestivalDetails();
  }, [id]);

  useEffect(() => {
    const userService = AuthServiceFactory.create();
    async function fetchAndSetUser() {
      try {
        const userObject = await userService.getUser();
        setUser(userObject);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/loginusuario');
      }
    }

    fetchAndSetUser();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const options = {
        page: 0, 
        perPage: 10, 
        terms: '', 
        sort: 'time', 
        direction: 'ASC' 
      };
      const response = await subscriptionService.getSubscriptionByEventId(id, options);
      setSubscriptions(response.items);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
    }
  };
  
  const redirectToInscriptionPage = () => {
    if (user && user.roles && (user.roles.includes('MANAGER') || user.roles.includes('DANCER'))) {
      navigate(`/inscricao/${id}`);
    } else {
      alert('Apenas gerentes e dançarinos podem realizar inscrição!');
      navigate('/'); 
    }
  };

  const handleDownload = async (eventId) => {
    try {
      const blob = await eventService.downloadRules(eventId);
      const url = window.URL.createObjectURL(blob);
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

  const handleShowUploadForm = () => {
    setShowUploadForm(true);
  };

  if (!festival) {
    return <div>Evento não encontrado.</div>;
  }
  console.log(subscriptions);
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
      {user && user.roles && user.roles.includes('ADMIN') && (
        <button onClick={handleShowUploadForm}>Subir regras</button>
      )}
      {showUploadForm && <UploadForm id={id} />}
      {user && (user.roles.includes('ADMIN') || user.roles.includes('MANAGER')) && (
        <button onClick={() => handleDownload(id)}>Download regras</button>
      )}
      {subscriptions.length > 0 && (
        <div className="subscription-details">
          {subscriptions.map((subscription, index) => (
            <div key={index}>
              <form>
                <h3>{subscription.name}</h3>
                <p>{"Descrição: " + subscription.description}</p>
                <p>{"ID da inscrição: " + subscription.id}</p>
                <p>{"Categoria: " + subscription.category_id}</p>
                <p>{"Horário: " + new Date(subscription.time).toLocaleString()}</p>
                <p>{"Staff: " + (subscription.staff && Array.isArray(subscription.staff) ? subscription.staff.join(", ") : "N/A")}</p>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FestivalDetails;
