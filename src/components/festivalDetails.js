import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthServiceFactory } from "../services/auth.service";
import { SubscriptionServiceFactory } from "../services/subscription.service";
import moment from "moment";
import UploadForm from "../rules/uploadRules";
import "./festivalDetails.css";
import { EventServiceFactory } from "../services/event.service";

const FestivalDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const eventService = EventServiceFactory.create();
  const subscriptionService = SubscriptionServiceFactory.getInstance(
    "http://localhost:8091/v1/subscription"
  );

  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        const fetchedFestival = await eventService.getEventById(id);
        setFestival(fetchedFestival);
      } catch (error) {
        console.error("Erro ao buscar detalhes do evento", error);
      }
    };

    fetchFestivalDetails();
  }, [id, eventService, navigate]);

  useEffect(() => {
    const userService = AuthServiceFactory.create();
    async function fetchAndSetUser() {
      try {
        const userObject = await userService.getUser();
        setUser(userObject);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/loginusuario");
      }
    }

    fetchAndSetUser();
  }, [navigate]);

  const fetchSubscriptions = async () => {
    try {
      const options = {
        page: 0,
        perPage: 10,
        terms: "",
        sort: "time",
        direction: "ASC",
      };
      const response = await subscriptionService.getSubscriptionByEventId(
        id,
        options
      );
      setSubscriptions(response.items);
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error);
    }
  };

  const redirectToInscriptionPage = () => {
    if (
      user &&
      user.roles &&
      (user.roles.includes("MANAGER") || user.roles.includes("DANCER"))
    ) {
      navigate(`/inscricao/${id}`);
    } else {
      alert("Apenas gerentes e dançarinos podem realizar inscrição!");
      navigate("/");
    }
  };

  const handleDownload = async (eventId) => {
    try {
      const blob = await eventService.downloadRules(eventId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rules.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error("Erro ao baixar as regras:", error);
    }
  };

  const handleShowUploadForm = () => {
    setShowUploadForm(true);
  };

  if (!festival) {
    return <div>Evento não encontrado.</div>;
  }

  function monthName(n) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[n - 1];
  }

  return (
    <div className="festival-details">
      <div className="head">
        <span className="date">
          <em className="day">{moment(festival.time).format("DD")}</em>
          <em className="month">
            {monthName(moment(festival.time).format("MM"))}
          </em>
        </span>
        <h1 className="name">{festival.name}</h1>
      </div>
      <div className="info">
        <p>{festival.description}</p>
        <p>Horário: {moment(festival.time).format("HH:mm")}</p>
        <p>Local: {festival.place}</p>
        <ul>
          {festival.categories.map((categoria, index) => (
            <li key={index}>{categoria.type}</li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={redirectToInscriptionPage} className="btn-inscription">
          Inscrever no Festival
        </button>
        <button onClick={fetchSubscriptions}>Ver inscrições</button>
        {user && user.roles && user.roles.includes("ADMIN") && (
          <button onClick={handleShowUploadForm}>Subir regras</button>
        )}
        {showUploadForm && <UploadForm id={id} />}
        {user && user.roles &&
          (user.roles.includes("ADMIN") ||
            user.roles.includes("MANAGER")) && (
            <button onClick={handleDownload}>Download regras</button>
          )}
      </div>

      {subscriptions.length > 0 && (
        <div className="subscription-details">
          {subscriptions.map((subscription) => (
            <div key={subscription.id}>
              <form>
                <h3>{subscription.name}</h3>
                <p>{"Descrição: " + subscription.description}</p>
                <p>{"ID da inscrição" + subscription.id}</p>
                <p>{"Categories:" + subscription.category_id}</p>
                <p>{"Horario: " + subscription.time}</p>
                <p>
                  {"Staff: " + Array.isArray(subscription.staff)
                    ? subscription.staff.join(", ")
                    : ""}
                </p>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FestivalDetails;
