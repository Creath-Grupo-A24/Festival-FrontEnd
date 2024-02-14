import axios from 'axios';
import Cookies from 'js-cookie';

export class EventService {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async createEvent(eventData) {
        let response = await fetch(`${this.apiBaseUrl}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(eventData)
        });

        if (response.status !== 201) {
            throw new Error('Erro ao criar evento');
        }
        
        const locationHeader = response.headers.get('Location');
        if (locationHeader) {
            alert('Evento criado');
            return locationHeader.split('/').pop();
        } else {
            throw new Error('Evento criado, mas o cabeçalho "Location" não foi retornado pela API.');
            alert('Evento criado, mas o cabeçalho "Location" não foi retornado pela API.');
        }
    }

    async uploadRules(file, id) {
        const formData = new FormData();
        formData.append("file", file);
        let response = await fetch(`${this.apiBaseUrl}/rules/${id}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: formData
        });

        if (response.status !== 200) {
            throw new Error('Erro ao fazer upload do arquivo');
        }
    }

    async downloadRules(id) {
        let response = await fetch(`${this.apiBaseUrl}/rules/${id}/download`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            method: 'GET'
        });

        if (response.status !== 200) {
            throw new Error('Erro ao fazer download do arquivo');
        }

        return response.blob();
    }

    async getEventById(id) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/${id}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao chamar getEventById:', error);
            throw error;
        }
    }

    async getEvents(page, perPage, terms, sort, direction) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/list`, {
                params: {
                    page,
                    perPage,
                    terms,
                    sort,
                    direction
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao chamar getEvents:', error);
            throw error;
        }
    }

    async getCategories(){
        try {
            const response = await axios.get(`${this.apiBaseUrl}/categories`);
            return response.data;
        } catch (error) {
            console.error('Erro ao chamar getCategories:', error);
            throw error;
        }
    }

}

export const EventServiceFactory = (function () {
    let instance;
    return {
        create: function () {
            if (!instance) {
                instance = new EventService('http://localhost:8091/v1/events');
            }
            return instance;
        }
    };
})();

