import React from 'react';
import './MemberDetailsModal.css';
const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="modal">
      <h2>Member Details</h2>
      <p>Username: {member.username}</p>
      <p>Level: {member.level}</p>
      <p>Item Level: {member.ilvl}</p>
      <p>Character Role: {member.character_role}</p>
      <p>Guild Role: {member.guild_role}</p>
      <p>Main Archetype: {member.main_archetype}</p>
      <p>Secondary Archetype: {member.secondary_archetype}</p>
      <p>Grandmaster Profession One: {member.grandmaster_profession_one}</p>
      <p>Grandmaster Profession Two: {member.grandmaster_profession_two}</p>
      <p>Email: {member.email}</p>
      <p>Notify Email: {member.notify_email ? 'Yes' : 'No'}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MemberDetailsModal;