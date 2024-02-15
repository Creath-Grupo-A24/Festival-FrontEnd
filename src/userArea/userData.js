import React, { useEffect, useState } from "react";
import './userData.css';
import { ECompanyServiceFactory } from '../services/company.service';
import { AuthServiceFactory } from '../services/auth.service';

const companyService = ECompanyServiceFactory.create();
const userService = AuthServiceFactory.create();

const UserData = () => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userObject = await userService.getUser();
        setUser(userObject); 

        if (userObject.company_id) {
          const companyObject = await companyService.getCompany(userObject.company_id);
          setCompany(companyObject);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, []); 

  return (
    <div>
       { user && (<form>
        
            <label>Username:</label>
            <input value={user.username[0].toUpperCase() + user.username.slice(1)} readOnly></input>
            <label>Email:</label>
            <input value={user.email} readOnly></input>
            <label>Nome:</label>
            <input value={user.name[0].toUpperCase() + user.name.slice(1)} readOnly></input>
            <label>Roles:</label>
            <input value={user.roles[0]} readOnly></input>
            <label>CPF:</label>
            <input value={user.cpf} readOnly></input>
            <label>Telefone:</label>
            <input value={user.phone} readOnly></input>
            <label>Data de nascimento:</label>
            <input value={user.birth_date} readOnly></input>
            {company && (
              <div>
                <h2>Dados da Companhia</h2>
                <p>Nome: {company.name}</p>
                <p>ID: {company .id}</p>
              </div>
            )}
        </form>
        )}
    </div>
  );
};

export default UserData;
