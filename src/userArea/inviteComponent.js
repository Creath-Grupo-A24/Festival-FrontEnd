import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteServiceFactory } from "../services/invite.service";
import "./inviteComponent.css";

const InviteComponent = ({ company }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if(!company) navigate("/");

  })

  const [inviteKey, setInviteKey] = useState("");
  const [inviteData, setInviteData] = useState({
    company_id: company.id,
    guest_id: ''
  });

  const inviteService = InviteServiceFactory.create();

  const handleInvite = async () => {
    try {
      await inviteService.invite(inviteData);
      alert("Convite enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar convite:", error);
      alert("Falha ao enviar o convite.");
    }
  };

  return (
    <div className="invite">
      <h1>Envie o convite!</h1>
      <div className="invite-group">
        <input
          placeholder="Digite o id de um usuário válido"
          type="email"
          value={inviteData.uuid}
          onChange={(e) =>
            setInviteData({ ...inviteData, guest_id: e.target.value })
          }
        />
      </div>
      <button className="btn" onClick={handleInvite}>
        Enviar Convite
      </button>
    </div>
  );
};

export default InviteComponent;
