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
            return { error: 'Erro ao criar inscrição' };
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
            return { error: 'Erro ao buscar inscrição' };
        }

        return response.json();
    }

    async getSubscriptions({ page = 0, perPage = 10, terms = '', sort = 'time', direction = 'ASC' }) {
        const queryParams = new URLSearchParams({
            page,
            perPage,
            terms,
            sort,
            direction
        }).toString();
    
        let response = await fetch(`${this.apiBaseUrl}/list?${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
    
        if (response.status !== 200) {
            return { error: 'Erro ao buscar inscrições' };
        }
    
        return response.json();
    }
    

    async getSubscriptionByEventId(eventId, { page = 0, perPage = 10, terms = '', sort = 'time', direction = 'ASC' } = {}) {
        const queryParams = new URLSearchParams({ page, perPage, terms, sort, direction }).toString();
        let response = await fetch(`${this.apiBaseUrl}/event/${eventId}?${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        });
    
        if (response.status !== 200) {
            return { error: 'Erro ao buscar inscrições' };
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




