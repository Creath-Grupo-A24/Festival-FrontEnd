import React, { useEffect, useState } from "react";
import { getSubscriptions, getSubscription } from "../components/eventService"; 
import './subArea.css';
import { useNavigate } from "react-router-dom";

const SubArea = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await getSubscriptions({});
                setSubscriptions(response.data.items);
            } catch (error) {
                console.error('Erro ao buscar subscrições:', error);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleDetailsClick = async (id) => {
        try {
            const response = await getSubscription(id);
            navigate('/userarea/details', { state: { subscriptionDetails: response.data } });
        } catch (error) {
            console.error('Erro ao buscar detalhes da subscrição:', error);
        }
    };

    return (
        <div>
            {subscriptions.map(subscription => (
                <form key={subscription.id}>
                    <label>ID:</label>
                    <input value={subscription.id} readOnly></input>
                    <label>Nome:</label>
                    <input value={subscription.name} readOnly></input>
                    <label>Descrição:</label>
                    <textarea value={subscription.description} readOnly></textarea>
                    <label>Horário:</label>
                    <input value={subscription.time} readOnly></input>
                    <label>ID da Categoria:</label>
                    <input value={subscription.category_id} readOnly></input>
                    <label>ID do Evento:</label>
                    <input value={subscription.event_id} readOnly></input>
                    <label>Staff:</label>
                    <input value={subscription.staff.join(", ")} readOnly></input>
                    <button type="button" onClick={() => handleDetailsClick(subscription.id)}>
                        Ver Detalhes
                    </button>
                    <hr /> 
                </form>
            ))}
        </div>
    );
};

export default SubArea;
