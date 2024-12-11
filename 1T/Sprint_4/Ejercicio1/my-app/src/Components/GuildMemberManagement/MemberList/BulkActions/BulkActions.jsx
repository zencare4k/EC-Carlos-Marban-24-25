import React, { useState, useEffect } from 'react';
import { getAllGuildMembers, deleteGuildMember, updateGuildMember } from '../../../../Services/guildmembers_API';

const BulkActions = ({ selectedMembers, onActionComplete = () => {} }) => {
  const [guildRole, setGuildRole] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [allMembers, setAllMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const members = await getAllGuildMembers();
        setAllMembers(members);
      } catch (error) {
        console.error('Error fetching all guild members:', error);
      }
    };

    fetchAllMembers();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      onActionComplete(allMembers.map(member => member.id));
    } else {
      onActionComplete([]);
    }
  };

  const handleAction = async (action) => {
    if (action === 'changeRole' && !guildRole) {
      setNotification({ message: 'Please select a guild role.', type: 'error' });
      return;
    }

    try {
      if (action === 'delete') {
        await Promise.all(selectedMembers.map(userId => deleteGuildMember(userId)));
        setNotification({ message: 'Members deleted successfully', type: 'success' });
        setGuildRole(''); // Reset guildRole after deletion
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
      <input
        type="checkbox"
        checked={selectAll}
        onChange={handleSelectAll}
      />
      <label>Select All Members</label>
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