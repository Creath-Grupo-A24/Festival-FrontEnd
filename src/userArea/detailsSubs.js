import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation();
    const { subscriptionDetails } = location.state || {};
    
    if (!subscriptionDetails) {
        return <div>Não foram encontrados detalhes para esta subscrição.</div>;
    }

    return (
        <div>
            <form>
                <label>ID:</label>
                <input value={subscriptionDetails.id} readOnly />
                <label>Nome:</label>
                <input value={subscriptionDetails.name} readOnly />
                <label>Descrição:</label>
                <textarea value={subscriptionDetails.description} readOnly />
                <label>Horário:</label>
                <input value={subscriptionDetails.time} readOnly />
                <label>ID da Categoria:</label>
                <input value={subscriptionDetails.category_id} readOnly />
                <label>ID do Evento:</label>
                <input value={subscriptionDetails.event_id} readOnly />
                <label>Staff:</label>
                <input value={Array.isArray(subscriptionDetails.staff) ? subscriptionDetails.staff.join(", ") : ''} readOnly /> 
            </form>
        </div>
    );
};

export default Details;
