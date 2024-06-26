import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Slider from "../../components/festivalSlider";
import ScrollObserver from "../../utils/scroll-observer";
import "./home.css";
import { EventServiceFactory } from "../../services/event.service";

const Festivais = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventServiceFactory.create().getEvents(0, 10, "", "time", "ASC");
        setEventos(response.items || []);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar eventos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      <div>
        {loading ? (
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="festivais-container">
            {eventos.map((evento, index) => (
              <ScrollObserver key={index}>
                <Link
                  to={`/festival/${evento.id}`}
                  key={evento.id}
                  className="festival-item-link"
                >
                  <div className="festival-item">
                    <div className="festival-info">
                      <p>{moment(evento.time).format("DD/MM/YYYY HH:mm")}</p>
                      <h3>{evento.name}</h3>
                      <p>{evento.description}</p>

                      <h4>Categorias:</h4>
                      <ul className="categories-list">
                        {evento.categories.map((categoria, index) => (
                          <li className="category" key={index}>
                            {categoria.type}
                          </li>
                        ))}
                      </ul>
                      <p>Local: {evento.place}</p>
                    </div>
                    <Slider evento={evento} />
                  </div>
                </Link>
              </ScrollObserver>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Festivais;
