import React, { useState } from 'react';
import MemberDetailsModal from '../MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from '../MemberEditModal/MemberEditModal';
import './MemberItem.css';
import ConfirmationDialog from '../../../General/ConfirmationDialog/ConfirmationDialog';

const MemberItem = ({ member, onSelectMember, onUpdateMember, onDeleteMember }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedMember) => {
    await onUpdateMember(member.user_id, updatedMember);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmDelete = () => {
    onDeleteMember(member.user_id);
    setShowConfirmationDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationDialog(false);
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
          <button onClick={handleDelete}>Delete</button>
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
      {showConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this member?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default MemberItem;