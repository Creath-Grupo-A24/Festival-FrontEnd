import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from './festivalService';
import { createSubscription } from './eventService';
import './eventSub.css';

const Subscription = () => {
  const user = localStorage.getItem('user');
  const userString = user ? JSON.parse(user) : {};
  const [festival, setFestival] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

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
          setFestival(fetchedFestival);
          setName(fetchedFestival.name);
          setDescription(fetchedFestival.description);
          setTime(fetchedFestival.time);
          setCategory(fetchedFestival.categories.join(', '));
          setEvent_Id(fetchedFestival.id);
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

  const handleSubmit = async () => {
    const subscriptionData = {
      name,
      description,
      time,
      category,
      event_id: id,
      staff_id: staffIds,
    };

    try {
      await createSubscription(subscriptionData);
      alert("Inscrição criada com sucesso!");
      navigate('/');
    } catch (error) {
      console.error("Erro ao criar inscrição:", error);
    }
  };

  return (
    <div className="eventSub">
      <label>Nome: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Descrição: </label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <label>Horário: </label>
      <input type="text" value={time} onChange={e => setTime(e.target.value)} />
      <label>Categorias: </label>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
      <label>Event ID:</label>
      <input type="text" value={event_id} readOnly />

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
