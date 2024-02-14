import React from "react";
import { Link } from "react-router-dom";
import "./companyinfo.css";

const CompanyInfo = ({ company, user }) => {
  //caso tenha companhia
  /*if (company != null) {
    return <div>
        <h2>Company: {company.name}</h2>
        <p>Company ID: {company.id}</p>
    </div>;
  }*/

  //caso nao tenha companhia e seja diretor
  if (user && user.roles.includes("MANAGER"))
    return (
      <div className="company-creation-send">
        <div className="container-company">
          <h1 className="head-title">
            A NEVER-BEFORE-SEEN <br /> EXPERIENCE ON <br />
            DANCEHUB!
          </h1>
          <Link to={"/createcompany"} className="button">
            Create your company!
          </Link>
        </div>
      </div>
    );
};

export default CompanyInfo;
