import React, { useState, useEffect } from "react";
import './event-create.css';
import { EventServiceFactory } from '../../../services/event.service';
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const eventService = EventServiceFactory.create();

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await eventService.getCategories();
            setCategories(fetchedCategories);
            const initialSelected = fetchedCategories.reduce((acc, category) => {
                acc[category.id] = false;
                return acc;
            }, {});
            setSelectedCategories(initialSelected);
        };

        fetchCategories();
    }, [eventService]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedCategoryIds = Object.entries(selectedCategories)
            .filter(([key, value]) => value)
            .map(([key]) => parseInt(key));

        const isoDate = time ? new Date(time).toISOString() : '';

        const eventData = {
            name,
            description,
            place,
            time: isoDate,
            categories_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : [],
        };

        try {
            await eventService.createEvent(eventData);
            alert("Evento criado com sucesso!");
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar evento:", error);
        }
    };

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

    return (
        <div className="create_event-form-area">
            <form onSubmit={handleSubmit}>
                <div className='create_event-form-group'>
                    <label>Nome:</label>
                    <input
                        name='Nome'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='create_event-form-group'>
                    <label>Descrição:</label>
                    <textarea
                        name='Descrição'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='create_event-form-group'>
                    <label>Local:</label>
                    <input
                        name='Local'
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required
                    />
                </div>
                <div className='create_event-form-group'>
                    <label>Data:</label>
                    <input
                        name='Nome'
                        type="date"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="categoriesSelection">
                    <label>Categorias:</label>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={category.id.toString()}
                                    checked={selectedCategories[category.id]}
                                    onChange={handleCategoryChange}
                                />
                                {category.type}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="criar">Criar Evento</button>
            </form>
        </div>
    );
};

export default CreateEvent;
