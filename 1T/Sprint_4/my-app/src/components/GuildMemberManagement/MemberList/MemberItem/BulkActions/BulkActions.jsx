import React, { useState } from 'react';

const BulkActions = ({ selectedMembers, onChangeRole, onDeleteMembers }) => {
    const [newRole, setNewRole] = useState('');

    const handleRoleChange = () => {
        if (newRole.trim() === '') {
            alert('Please enter a valid role.');
            return;
        }
        onChangeRole(selectedMembers, newRole);
    };

    const handleDelete = () => {
        if (selectedMembers.length === 0) {
            alert('No members selected.');
            return;
        }
        onDeleteMembers(selectedMembers);
    };

    return (
        <div>
            <h3>Bulk Actions</h3>
            <div>
                <input 
                    type="text" 
                    placeholder="New Role" 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)} 
                />
                <button onClick={handleRoleChange}>Change Guild Role</button>
            </div>
            <div>
                <button onClick={handleDelete}>Delete Members</button>
            </div>
        </div>
    );
};

export default BulkActions;