import React, { useState } from 'react';
import { getAllGuildMembers, bulkUpdateRoles, deleteGuildMembers } from '../../../../Services/guildmembers_API';
import ConfirmationDialog from '../../../General/ConfirmationDialog/ConfirmationDialog';
import './BulkActions.css';
const BulkActions = ({ onActionComplete }) => {
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleSelectAll = async () => {
        try {
            const members = await getAllGuildMembers();
            if (members.length > 0) {
                setSelectedMembers(members.map(member => member.user_id));
                setAllSelected(true);
            } else {
                setError('No members available to select');
            }
        } catch (err) {
            setError('Error fetching members');
        }
    };

    const handleRoleChange = async () => {
        try {
            await bulkUpdateRoles(selectedMembers, role);
            setSuccess('All roles updated successfully');
            onActionComplete();
        } catch (err) {
            setError('Error updating roles');
        }
    };

    const handleDeleteMembers = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        setShowDeleteDialog(false);
        try {
            await deleteGuildMembers(selectedMembers);
            setSuccess('Members deleted successfully');
            onActionComplete();
        } catch (err) {
            setError('Error deleting members');
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleCloseDialog = () => {
        setShowDeleteDialog(false);
    };

    return (
        <div>
            <h3>Bulk Actions</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <button onClick={handleSelectAll}>Select All Members</button>
            </div>
            <div>
                <label>
                    New Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="LIDER">LIDER</option>
                        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                        <option value="GERENTE">GERENTE</option>
                        <option value="GERENTE A2">GERENTE A2</option>
                        <option value="ALPHA 2">ALPHA 2</option>
                        <option value="MEMBER">MEMBER</option>
                    </select>
                </label>
                <button onClick={handleRoleChange} disabled={!role}>Change Role</button>
            </div>
            <div>
                <button onClick={handleDeleteMembers} disabled={!allSelected}>Delete Members</button>
            </div>
            {showDeleteDialog && (
                <ConfirmationDialog
                    message="Are you sure you want to delete the selected members?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
};

export default BulkActions;