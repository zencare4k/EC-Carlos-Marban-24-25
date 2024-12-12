import React, { useState } from 'react';
import MemberDetailsModal from '../MemberDetailsModal/MemberDetailsModal';
import MemberEditModal from '../MemberEditModal/MemberEditModal';
import './MemberItem.css';
import ConfirmationDialog from '../../../General/ConfirmationDialog/ConfirmationDialog';
import { updateGuildMember, deleteGuildMember } from '../../../../Services/guildmembers_API';

const MemberItem = ({ member, members, onSelectMember = () => {}, onUpdateMember, onDeleteMember }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedMember) => {
    if (members.some(m => m.username === updatedMember.username && m.user_id !== member.user_id)) {
      setError('El nombre de usuario ya existe.');
      return;
    }
    try {
      await updateGuildMember(member.user_id, updatedMember);
      onUpdateMember(member.user_id, updatedMember);
      setIsEditModalOpen(false);
      setError('');
    } catch (error) {
      setError('Error updating member.');
    }
  };

  const handleDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteGuildMember(member.user_id);
      onDeleteMember(member.user_id);
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      setError('Error deleting member.');
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleCheckboxChange = () => {
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    onSelectMember(member.user_id, newIsSelected);
    const bulkActionsElement = document.getElementById('bulkActions');
    if (bulkActionsElement) {
      bulkActionsElement.disabled = !newIsSelected;
    }
  };

  return (
    <>
      <tr>
        <td><input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} /></td>
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