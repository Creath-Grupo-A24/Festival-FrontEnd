import Cookies from "js-cookie";
import { validarCPF, validarNumeroTelefone } from "../utils/validations";

export class AuthService {

  constructor(baseApiUrl) {
    this.baseApiUrl = baseApiUrl;
  }

  async login(username, password) {
    const response = await fetch(`${this.baseApiUrl}/in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    if (response.status === 401) {
      return { error: 'Usuário ou senha inválidos' }
    }

    if (!response.ok) {
      return { error: `Unexpected HTTP status: ${response.status}` };
    }

    const authUser = await response.json();
    Cookies.set('token', authUser.token, { secure: true, sameSite: 'strict', expires: 1 })
  }

  async register({ username, email, password, name, birthDate, role_id, cpf, phone }) {
    if (!validarCPF(cpf)) {
      return { error: 'CPF inválido!' };
    }

    if (!validarNumeroTelefone(phone)) {
      return { error: 'Número de telefone inválido!' };
    }

    const response = await fetch(`${this.baseApiUrl}/up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, name, birthDate, role_id, cpf, phone })
    });

    if (response.status === 401) {
      return { error: 'Usuário ou senha inválidos' }
    }

    if (!response.ok) {
      return { error: `Unexpected HTTP status: ${response.status}` };
    }

    const authUser = await response.json();
    Cookies.set('token', authUser.token, { secure: true, sameSite: 'strict', expires: 1 })
  }

  async getUser() {
    const response = await fetch(`${this.baseApiUrl}/token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })

    if (response.status === 401) {
      return { error: 'Usuário não autenticado' }
    }

    let user = await response.json();
    return user;
  }

}

export const AuthServiceFactory = (function () {
  let instance;
  return {
    create: function () {
      if (!instance) {
        instance = new AuthService('http://localhost:8091/v1/sign');
      }
      return instance;
    }
  };
})();


