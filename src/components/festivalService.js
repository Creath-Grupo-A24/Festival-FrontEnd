import axios from 'axios';

const token = localStorage.getItem('token');

const apiBaseUrl = 'http://localhost:8091/v1/events';
export const createEvent = async (eventData) => {
    return await axios.post(`${apiBaseUrl}/`, eventData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const uploadRules = async (file, id) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Token do user: ",token);
    try {
        const response =  await axios.post(`${apiBaseUrl}/rules/${id}/upload`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log("resposta", response);
        return response;
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        throw error;      
    }
};

export const downloadRules = async (id) => {
    return await axios.get(`${apiBaseUrl}/rules/${id}/download`, {        
        responseType: 'blob',
        headers:{
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const getEventById = async (id) => {
    try{ 
        const response = await axios.get(`${apiBaseUrl}/${id}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response.data;
    }catch (error) {
        console.error('Erro ao chamar getEventById:', error);
        throw error;
    }
};

export const getEvents = async (page, perPage, terms, sort, direction) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/list`, {
            params: {
                page,
                perPage,
                terms,
                sort,
                direction
            }
        });
        console.log('Resposta do getEvents:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao chamar getEvents:', error);
        throw error;
    }
};

export const getCategories = async() => {
    try {
        const response = await axios.get(`${apiBaseUrl}/categories`);
        console.log('Resposta do getCategories:',response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao chamar getCategories:', error);
        throw error;
    }
}

