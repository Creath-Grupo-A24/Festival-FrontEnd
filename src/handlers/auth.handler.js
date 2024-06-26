import moment from "moment";
import { AuthServiceFactory } from "../services/auth.service";
import { validarCPF, validarNumeroTelefone } from "../utils/validations";

export async function loginHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const loginData = Object.fromEntries(formData.entries());
  const error = await AuthServiceFactory.create().login(loginData);
  if (error) return error;
}

export async function registerHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const registerData = Object.fromEntries(formData.entries());
  registerData.role_id = parseInt(registerData.role_id);
  registerData.birth_date = moment(registerData.birth_date).format('DD/MM/yyyy');

  if (!validarCPF(registerData.cpf)) {
    alert('CPF inválido!');
    return;
  }

  if (registerData.phone && !validarNumeroTelefone(registerData.phone)) {
    alert('Número de telefone inválido!');
    return;
  }
  
  const error = await AuthServiceFactory.create().register(registerData);
  if (error) return error;
}

