import Cookies from 'js-cookie';

export class SubscriptionService {

    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async createSubscription(subscriptionData) {
        let response = fetch(`${this.apiBaseUrl}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            method: 'POST',
            body: JSON.stringify(subscriptionData)
        });

        if (response.status !== 201) {
            throw new Error('Erro ao criar inscrição');
        }

        return response.headers.get('Location').split('/').pop();
    }

    async getSubscription(id) {
        let response = fetch(`${this.apiBaseUrl}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        });

        if (response.status !== 200) {
            throw new Error('Erro ao buscar inscrição');
        }

        return response.json();
    }

    async getSubscriptions({ page = 0, perPage = 10, terms, sort = 'time', direction = 'ASC' }) {
        let response = fetch(`${this.apiBaseUrl}/list`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            params: { page, perPage, terms, sort, direction }
        });

        if (response.status !== 200) {
            throw new Error('Erro ao buscar inscrições');
        }

        return response.json();
    }

    async getSubscriptionByEventId(eventId, { page = 0, perPage = 10, terms, sort = 'time', direction = 'ASC' }) {
        let response = fetch(`${this.apiBaseUrl}/event/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            params: { page, perPage, terms, sort, direction }
        });

        if (response.status !== 200) {
            throw new Error('Erro ao buscar inscrições');
        }

        return response.json();
    }
}

export const SubscriptionServiceFactory = (function () {
    let instance;
    return {
        getInstance: function (apiBaseUrl) {
            if (!instance) {
                instance = new SubscriptionService(apiBaseUrl);
            }
            return instance;
        }
    }
})();




