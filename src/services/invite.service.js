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
            return { error: 'Erro ao enviar convite' };
        }
    }

    async confirm(key) {
        try {
            const response = await axios.get(`${this.baseApiUrl}/confirm/${key}`);
            return response.data; 
        } catch (error) {
            return { error: 'Erro ao confirmar convite' };
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
