import Cookies from "js-cookie";
import axios from "axios";

export class CompanyService {
    constructor(baseApiUrl) {
        this.baseApiUrl = baseApiUrl;
    }
    
    async createCompany(companyData){
        try {
            const response = await axios.post(this.baseApiUrl, JSON.stringify(companyData), {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`,
                    'Content-Type': 'application/json', 
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar companhia', error);
            throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
        }
    }

    async getCompany(id){
        try {
            const response = await axios.get(`${this.baseApiUrl}${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar companhia', error);
            throw error.response ? new Error(`Erro HTTP! Status: ${error.response.status}`) : error;
        }
    }

}

export const ECompanyServiceFactory = (function () {
    let instance;
    return {
        create: function () {
            if (!instance) {
                instance = new CompanyService('http://localhost:8091/v1/companies/');
            }
            return instance;
        }
    };
})();