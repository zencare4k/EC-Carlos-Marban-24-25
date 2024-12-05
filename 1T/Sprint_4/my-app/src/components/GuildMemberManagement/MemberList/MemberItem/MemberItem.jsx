import React from 'react';

import React, { useState } from 'react';
import MemberEditModal from '../../MemberList/MemberItem/MemberEditModal/MemberEditModal';
import guildmembers_api from '../../../../services/guildmembers_API';

const MemberItem = ({ member, onSelect, onEdit, onDelete }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEdit = (updatedMember) => {
        guildmembers_api.updateMember(updatedMember).then(() => {
            onEdit(updatedMember);
            setEditModalOpen(false);
        });
    };

    const handleDelete = (memberId) => {
        guildmembers_api.deleteMember(memberId).then(() => {
            onDelete(memberId);
        });
    };

    return (
        <>
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        onChange={() => onSelect(member.id)} 
                    />
                </td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>
                    <button onClick={() => setEditModalOpen(true)}>Edit</button>
                    <button onClick={() => handleDelete(member.id)}>Delete</button>
                </td>
            </tr>
            {isEditModalOpen && (
                <MemberEditModal 
                    member={member} 
                    onSave={handleEdit} 
                    onClose={() => setEditModalOpen(false)} 
                />
            )}
        </>
    );
};

export default MemberItem;