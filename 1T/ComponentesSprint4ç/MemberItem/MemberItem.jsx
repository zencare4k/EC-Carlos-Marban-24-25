import React from 'react';
import './MemberItem.css';
const MemberItem = ({ member, onSelect, onEdit, onDelete }) => {
  return (
    <tr>
      <td><input type="checkbox" onChange={() => onSelect(member.user_id)} /></td>
      <td>{member.username}</td>
      <td>{member.level}</td>
      <td>{member.ilvl}</td>
      <td>{member.character_role}</td>
      <td>{member.guild_role}</td>
      <td>{member.main_archetype}</td>
      <td>{member.secondary_archetype}</td>
      <td>{member.grandmaster_profession_one}</td>
      <td>{member.grandmaster_profession_two}</td>
      <td>{member.email}</td>
      <td>{member.notify_email ? 'Yes' : 'No'}</td>
      <td>
        <button onClick={() => onEdit(member)}>Edit</button>
        <button onClick={() => onDelete(member.user_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default MemberItem;