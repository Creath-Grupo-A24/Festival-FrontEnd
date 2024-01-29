import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080';

export const createFestival = async (festival) => {
    return await axios.post(`${apiBaseUrl}/create`, festival);
};

export const getFestival = async (documentId) => {
    return await axios.get(`${apiBaseUrl}/get`, { params: { documentId } });
};

export const updateFestival = async (festival) => {
    return await axios.put(`${apiBaseUrl}/update`, festival);
};

export const deleteFestival = async (documentId) => {
    return await axios.put(`${apiBaseUrl}/delete`, { params: { documentId } });
};

export const getAll = async () => {
    return await axios.get(`${apiBaseUrl}/getAll`);
};

export const getFestivalById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/get`, { params: { id: id } });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do festival:", error);
        throw error;
    }
};

