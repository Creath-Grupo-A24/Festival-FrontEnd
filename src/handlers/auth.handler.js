import { AuthServiceFactory } from "../services/auth.service";

export async function loginHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  let username = formData.get('username');
  let password = formData.get('password');

  const error = await AuthServiceFactory.create().login(username, password);
  if (error) return error;
}