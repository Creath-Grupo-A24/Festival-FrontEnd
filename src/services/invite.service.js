import axios from "axios";

export class InviteService {
    constructor(baseApiUrl) {
        this.baseApiUrl = baseApiUrl;
    }

    async invite(inviteData) {
        try {
            const response = await axios.post(`${this.baseApiUrl}`, inviteData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data; 
        } catch (error) {
            console.error('Erro ao enviar convite:', error);
            throw error;
        }
    }

    async confirm(key) {
        try {
            const response = await axios.get(`${this.baseApiUrl}/confirm/${key}`);
            return response.data; 
        } catch (error) {
            console.error('Erro ao confirmar convite:', error);
            throw error; 
        }
    }
}

export const InviteServiceFactory = (function () {
    let instance;
    return {
        create: function () {
            if (!instance) {
                instance = new InviteService('http://localhost:8091/v1/invite');
            }
            return instance;
        }
    };
})();
