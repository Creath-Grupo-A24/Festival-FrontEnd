import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from './festivalService';
import { createSubscription } from './eventService';
import './eventSub.css';
import moment from 'moment';

const Subscription = () => {
  const user = localStorage.getItem('user');
  const userString = user ? JSON.parse(user) : {};
  //const [festival, setFestival] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [event_id, setEvent_Id] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [staffIds, setStaffIds] = useState([]);

  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        const fetchedFestival = await getEventById(id);
        if (fetchedFestival) {
          //setFestival(fetchedFestival);
          setEvent(fetchedFestival);
          setName(fetchedFestival.name);
          setDescription(fetchedFestival.description);
          setTime(fetchedFestival.time);
          setCategory(fetchedFestival.categories);
          setEvent_Id(fetchedFestival.id);
          console.log(fetchedFestival.categories);
          console.log(category[0].type);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento', error);
      }
    };

    fetchFestivalDetails();
  }, [id]);

  const handleAddStaff = () => {
    if (selectedStaffId && !staffIds.includes(selectedStaffId)) {
      setStaffIds(prevStaffIds => [...prevStaffIds, selectedStaffId]);
    }
  };

  const handleStaffSelectChange = (e) => {
    setSelectedStaffId(e.target.value);
  };

  const parsedCategoryId = parseInt(category, 10);

  const handleSubmit = async () => {
    const subscriptionData = {
      name: name,
      description: description,
      time: time,
      category_id:parsedCategoryId,
      event_id: id,
      staff: staffIds,
    };

    try {
      console.log(subscriptionData);
      await createSubscription(subscriptionData);
      alert("Inscrição criada com sucesso!");
      navigate('/');
    } catch (error) {
      console.error("Erro ao criar inscrição:", error);
    }
  };

  return (
    <div className="eventSub">
      <h2>{'Incrição em '+ event.name}</h2>
      <label>Nome: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Descrição: </label>
      <textarea value={""} onChange={e => setDescription(e.target.value)} />
      <label>Horário: </label>
      <input type="datetime-local" id="dateTimeInput" value={moment(time).format("YYYY-MM-DDTHH:mm")} onChange={e => setTime(e.target.value)}/>      
      <label>Categorias: </label>
      <select className="select_categories" onChange={e => setCategory(e.target.value)}>
        <option value={category[0].id}>{category[0].type}</option>
      </select>

      <div>
        <label>Staff:</label>
        <select onChange={handleStaffSelectChange}>
          <option value="">Selecione um usuário</option>
          <option value={userString.id}>{userString.username}</option>
        </select>
        <button type="button" onClick={handleAddStaff}>{"Adicionar Staff"}</button>
        <input type="text" value={staffIds.join(", ")} readOnly />
      </div>

      <button type="button" onClick={handleSubmit}>Criar Inscrição</button>
    </div>
  );
};

export default Subscription;
