import React, { useState } from 'react';
import { updateGuildMember, deleteGuildMember } from '../../../../Services/guildmembers_API';
import './BulkActions.css';

const BulkActions = ({ selectedMembers, onActionComplete }) => {
  const [guildRole, setGuildRole] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleAction = async (action) => {
    if (action === 'changeRole' && !guildRole) {
      setNotification({ message: 'Please select a guild role.', type: 'error' });
      return;
    }

    try {
      if (action === 'delete') {
        await Promise.all(selectedMembers.map(userId => deleteGuildMember(userId)));
        setNotification({ message: 'Members deleted successfully', type: 'success' });
      } else if (action === 'changeRole') {
        await Promise.all(selectedMembers.map(userId => updateGuildMember(userId, { guild_role: guildRole })));
        setNotification({ message: 'Guild roles updated successfully', type: 'success' });
      }
      onActionComplete();
    } catch (error) {
      console.error(`Error performing bulk action (${action}):`, error);
      setNotification({ message: `Error performing bulk action (${action})`, type: 'error' });
    }
  };

  return (
    <div className="bulk-actions">
      <select value={guildRole} onChange={(e) => setGuildRole(e.target.value)}>
        <option value="">Select Guild Role</option>
        <option value="LIDER">LIDER</option>
        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
        <option value="GERENTE">GERENTE</option>
        <option value="GERENTE A2">GERENTE A2</option>
        <option value="ALPHA 2">ALPHA 2</option>
        <option value="MEMBER">MEMBER</option>
      </select>
      <button onClick={() => handleAction('changeRole')}>Change Guild Role</button>
      <button onClick={() => handleAction('delete')}>Delete Members</button>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default BulkActions;