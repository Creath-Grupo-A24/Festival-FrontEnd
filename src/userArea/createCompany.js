import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './createCompany.css';
import { createCompany } from './areaService';

const CreateCompany = () => {
    const navigate = useNavigate();
    const userString = JSON.parse(localStorage.getItem('user') || '{}');
    const [name, setCompanyName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const companyData = {
            owner_id: userString.id, 
            name
        };
        try {
            await createCompany(companyData);
            console.log('Companhia criada com sucesso', companyData);
            navigate('/userarea/data'); 
        } catch (error) {
            console.error('Erro ao enviar dados da companhia:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>ID do dono da companhia: {userString.id}</div> 
                <label>Nome da companhia: </label>
                <input type="text" value={name} onChange={(e) => setCompanyName(e.target.value)} />
                <button type="submit">Criar companhia</button>
            </form>
        </div>
    );
};

export default CreateCompany;
