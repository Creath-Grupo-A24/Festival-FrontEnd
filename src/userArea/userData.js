import React,{useEffect, useState} from "react";
import './userData.css';
import {listRoles} from '../usuarios/userService';
import {getCompany} from './areaService';

const UserData = () => {
  const user = localStorage.getItem('user');
  const [roles, setRoles] = useState([]);
  const userString = user ? JSON.parse(user) : {};
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
        try {
            const fetchedRoles = await listRoles();
            setRoles(fetchedRoles); 
        } catch (error) {
            console.error('Erro ao buscar roles:', error);
        }
    };

    fetchRoles();

    if (userString.company_id) {
      const fetchCompanyData = async () => {
        try {
          const fetchedCompanyData = await getCompany(userString.company_id);
          setCompanyData(fetchedCompanyData);
        } catch (error) {
          console.error('Erro ao buscar dados da companhia:', error);
        }
      };

      fetchCompanyData();
    }
  }, [userString.company_id]);

  const userRolesDescriptions = userString.roles.map(roleId => {
    const role = roles.find(r => r.type === userString.roles[0]);
    return role ? `${userString.roles[0]} - ${role.description}` : 'Role não encontrada';
  }).join(', ');
  
  return (
    <div>
        <form>
            <label>Username:</label>
            <input value={userString.username} readOnly></input>
            <label>Email:</label>
            <input value={userString.email} readOnly></input>
            <label>Nome:</label>
            <input value={userString.name} readOnly></input>
            <label>Roles:</label>
            <input value={userRolesDescriptions} readOnly></input>
            <label>CPF:</label>
            <input value={userString.cpf} readOnly></input>
            <label>Telefone:</label>
            <input value={userString.phone} readOnly></input>
            <label>Data de nascimento:</label>
            <input value={userString.birth_date} readOnly></input>
            {companyData && (
              <div>
                <h2>Dados da Companhia</h2>
                <p>Nome: {companyData.name}</p>
                <p>ID: {companyData.id}</p>
              </div>
            )}
        </form>
        
    </div>
  );
}
export default UserData;