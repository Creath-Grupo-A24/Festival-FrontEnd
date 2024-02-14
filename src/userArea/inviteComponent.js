import React, { useState } from 'react';
import { InviteServiceFactory } from '../services/invite.service';
import './inviteComponent.css';

const InviteComponent = () => {
    const [inviteKey, setInviteKey] = useState('');
    const [inviteData, setInviteData] = useState({
        uuid: ''
    });

    const inviteService = InviteServiceFactory.create();

    const handleInvite = async () => {
        try {
            await inviteService.invite(inviteData);
            alert('Convite enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar convite:', error);
            alert('Falha ao enviar o convite.');
        }
    };

    const handleConfirm = async () => {
        try {
            const confirmationResult = await inviteService.confirm(inviteKey);
            console.log(confirmationResult); 
        } catch (error) {
            console.error('Erro ao confirmar convite:', error);
            alert('Falha ao confirmar o convite.');
        }
    };

    return (
        <div className='invite'>
            <input 
                placeholder='Digite o id de um usuário válido'
                type="email" 
                value={inviteData.uuid} 
                onChange={(e) => setInviteData({ ...inviteData, uuid: e.target.value })} 
            />
            <button onClick={handleInvite}>Enviar Convite</button>
            <input 
                type="text" 
                value={inviteKey} 
                onChange={(e) => setInviteKey(e.target.value)} 
            />
            <button onClick={handleConfirm}>Confirmar Convite</button>
        </div>
    );
};

export default InviteComponent;
