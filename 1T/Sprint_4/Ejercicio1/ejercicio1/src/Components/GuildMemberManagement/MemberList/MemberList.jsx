import React, { useState } from 'react';
import MemberDetailsModal from './MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from './MemberEditModal/MemberEditModal';
import './MemberList.css';
import ConfirmationDialog from '../../General/ConfirmationDialog/ConfirmationDialog';

const MemberItem = ({ member, isSelected, onToggleSelect, onDeleteMember }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedMember) => {
    // Implementa la lógica para guardar los cambios del miembro
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteMember(member.user_id);
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  return (
    <>
      <tr>
        <td><input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(member.user_id)} /></td>
        <td onClick={() => setIsDetailsModalOpen(true)}>{member.username}</td>
        <td>{member.user_id}</td>
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
      {isDetailsModalOpen && (
        <MemberDetailsModal member={member} onClose={() => setIsDetailsModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <MemberEditModal
          member={member}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmationDialog
          message="¿Estás seguro de que deseas eliminar este miembro?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default MemberItem;