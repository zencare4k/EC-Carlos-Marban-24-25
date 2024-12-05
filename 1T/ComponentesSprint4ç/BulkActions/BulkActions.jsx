import React from 'react';
import './BulkActions.css';
const BulkActions = ({ selectedMembers, onBulkAction }) => {
  if (selectedMembers.length === 0) return null;

  return (
    <div>
      <button onClick={() => onBulkAction('send_message')}>Send Message</button>
      <button onClick={() => onBulkAction('change_guild_role')}>Change Guild Role</button>
      <button onClick={() => onBulkAction('delete_members')}>Delete Members</button>
    </div>
  );
};

export default BulkActions;