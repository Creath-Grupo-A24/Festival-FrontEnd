import axios from 'axios';

const apiBaseUrl = 'http://localhost:8091/v1/events';
//função sera atualizada
export const createEvent = async (eventData) => {
    return await axios.post(`${apiBaseUrl}/`, eventData, {
        headers: {
            'Content-Type': 'application/json',
            // Falta a autorização, sera adicionado apos a inclusão do cookie de sessão
        }
    });
};
//função sera atualizada
export const uploadRules = async (file, id) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios.post(`${apiBaseUrl}/rules/${id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // Falta a autorização, sera adicionado apos a inclusão do cookie de sessão
        }
    });
};
//função sera atualizada
export const downloadRules = async (id) => {
    return await axios.get(`${apiBaseUrl}/rules/${id}/download`, {
        responseType: 'blob',
        // Falta a autorização, sera adicionado apos a inclusão do cookie de sessão
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

