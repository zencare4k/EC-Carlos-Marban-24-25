import React, { useState } from 'react';
import MemberDetailsModal from '../MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from '../MemberEditModal/MemberEditModal';
import './MemberItem.css';

const MemberItem = ({ member, onSelectMember, onUpdateMember, onDeleteMember }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedMember) => {
    await onUpdateMember(member.user_id, updatedMember);
    setShowEditModal(false);
  };

  return (
    <>
      <tr>
        <td><input type="checkbox" onChange={() => onSelectMember(member.user_id)} /></td>
        <td onClick={() => setShowDetailsModal(true)}>{member.username}</td>
        <td>{member.level}</td>
        <td>{member.ilvl}</td>
        <td>{member.character_role}</td>
        <td>{member.guild_role}</td>
        <td>{member.main_archetype}</td>
        <td>{member.secondary_archetype}</td>
        <td>{member.grandmaster_profession_one}</td>
        <td>{member.grandmaster_profession_two}</td>
        <td>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDeleteMember(member.user_id)}>Delete</button>
        </td>
      </tr>
      {showDetailsModal && (
        <MemberDetailsModal member={member} onClose={() => setShowDetailsModal(false)} />
      )}
      {showEditModal && (
        <MemberEditModal
          member={member}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default MemberItem;