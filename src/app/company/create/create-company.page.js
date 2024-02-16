import React from "react";
import { useNavigate } from "react-router-dom";
import "./create-company.css";
import { AuthServiceFactory } from "../../../services/auth.service";
import { Helmet } from "react-helmet";
import { CompanyServiceFactory } from "../../../services/company.service";

const CreateCompany = ({ user, setUser, company, setCompany }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const companyname = Object.fromEntries(formData.entries());
    const companyData = {
      owner_id: user.id,
      name: companyname.companyName,
    };
    const companyService = CompanyServiceFactory.create();
    try {
      const companyCreated = await companyService.createCompany(companyData);
      console.log("Companhia criada com sucesso", companyData);
      const fetchUser = async () => {
        const user = await AuthServiceFactory.create().getUser();
        const company = await companyService.getCompany(companyCreated.id)
        setUser(user);
        setCompany(company)
      };
      fetchUser();
    } catch (error) {
      console.error("Erro ao enviar dados da companhia:", error);
    }
  };

  if(company != null){
    navigate("/company");
  }

  
  return (
    <div className="company-form-area">
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2>Create your company now and join our events!</h2>
        </div>
        <div className="company-form-group">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            autoComplete="Company Name"
          />
          <i className="bx bxs-user"></i>
        </div>
        <button className="btn" type="submit">
          Create Company
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
