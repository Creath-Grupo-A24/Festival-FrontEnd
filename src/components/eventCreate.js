import React, { useState } from "react";

const CreateEvent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    // Inicializa um objeto para as categorias selecionadas com valores booleanos
    const [selectedCategories, setSelectedCategories] = useState({
        solo: false,
        duo: false,
        trio: false,
    });

    // Lida com a mudança das caixas de seleção das categorias
    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories(prevCategories => ({
            ...prevCategories,
            [name]: checked,
        }));
    };

    return (
        <div className="createEvent">
            <label>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            
            <label>Descrição: </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            
            <label>Local: </label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            
            <label>Data: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            
            <div>
                <label>Categorias:</label>
                {Object.keys(selectedCategories).map((category) => (
                    <div key={category}>
                        <label>
                            <input
                                type="checkbox"
                                name={category}
                                checked={selectedCategories[category]}
                                onChange={handleCategoryChange}
                            />
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateEvent;
