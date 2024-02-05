import axios from "axios";

const apiBaseUrl = 'http://localhost:8091/v1/companies/';

export const createCompany = async (companyData) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post(apiBaseUrl, JSON.stringify(companyData), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar companhia', error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
}

export const getCompany = async (id) => {
    try {
        const response = await axios.get(`${apiBaseUrl}${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar companhia', error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
} 