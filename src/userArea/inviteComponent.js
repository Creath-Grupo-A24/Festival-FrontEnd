import React, { useState } from "react";
import { InviteServiceFactory } from "../services/invite.service";
import "./inviteComponent.css";

const InviteComponent = () => {
  const [inviteKey, setInviteKey] = useState("");
  const [inviteData, setInviteData] = useState({
    uuid: "",
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

  const handleConfirm = async () => {
    try {
      await inviteService.confirm(inviteKey);
    } catch (error) {
      alert("Falha ao confirmar o convite.");
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
            setInviteData({ ...inviteData, uuid: e.target.value })
          }
        />
      </div>
      <button className="btn" onClick={handleInvite}>
        Enviar Convite
      </button>
      <br />
      <h1>Insira o código enviado!</h1>
      <div className="invite-group">
        <input
          placeholder="Digite o código que o usuário recebeu"
          type="text"
          value={inviteKey}
          onChange={(e) => setInviteKey(e.target.value)}
        />
      </div>
      <button onClick={handleConfirm}>Confirmar Convite</button>
    </div>
  );
};

export default InviteComponent;
