import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "./festivalService";
import { listRoles } from "../usuarios/userService";
import "./festivais.css";
import moment from "moment";
import Slider from "./festivalSlider";
import Banner from "./banner";
import "./festivais.css";
import Footer from "./footer";
import ScrollObserver from "./utils/ScrollObserver";

const Festivais = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents(0, 10, "", "time", "ASC");
        setEventos(response.items || []);
        setEventos(response.items || []);
      } catch (error) {
        console.error("Erro ao buscar eventos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      <Banner />
      <div className="festivais-container">
        {eventos.map((evento, index) => (
          <ScrollObserver key={index}>
            <Link
              to={`/festival/${evento.id}`}
              key={evento.id}
              className="festival-item-link"
            >
              <div className="festival-item">
                {/* <img src={evento.imagem} alt={evento.name} /> Imagem comentada ate estar disponivel*/}
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
      <Footer />
    </div>
  );
};

export default Festivais;
