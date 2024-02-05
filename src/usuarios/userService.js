import axios from 'axios';

const apiBaseUrl = 'http://localhost:8091/v1/sign';

export const authenticateUser = async (username, password) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/in`, {
            username,
            password
        });
        return response.data; 

    } catch (error) {
        console.error("Erro ao autenticar:", error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/up`, userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return response.data; 

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
};

export const listRoles = async() => {
    try {
        const response = await axios.get(`${apiBaseUrl}/roles`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar roles:", error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
};

export const getUserByToken = async(token) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/token`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
};

export const getUserById = async(id) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
    }
}
