import axios from 'axios';

const API_BASE_URL = 'http://localhost:8091/v1/subscription/';

const user = localStorage.getItem('user');
const userString = user ? JSON.parse(user) : {}; 

export const createSubscription = async (subscriptionData) => {
    return await axios.post(`${API_BASE_URL}`, subscriptionData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userString.token}`, 
        }
    });
};

export const getSubscription = async (id) => {
    return await axios.get(`${API_BASE_URL}${id}`, {
        headers: {
            'Content-Type': 'application/json', 
        }
    });
};

export const getSubscriptions = async ({ page = 0, perPage = 10, terms, sort = 'time', direction = 'ASC' }) => {
    return await axios.get(`${API_BASE_URL}list`, {
        params: { page, perPage, terms, sort, direction },
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const getSubscriptionByEventId = async (eventId, { page = 0, perPage = 10, terms, sort = 'time', direction = 'ASC' }) => {
    return await axios.get(`${API_BASE_URL}event/${eventId}`, {
        params: { page, perPage, terms, sort, direction },
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
