import React, { useState, useCallback } from 'react';
import './MemberItem.css';

const MemberItem = ({ member, handleSelectMember, handleEditMember, handleDeleteMember, selected }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = useCallback(() => {
        setShowDetails((prevShowDetails) => !prevShowDetails);
    }, []);

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleSelectMember(member.user_id)}
                />
            </td>
            <td>{member.user_id}</td>
            <td onClick={toggleDetails} style={{ cursor: 'pointer', color: 'blue' }}>
                {member.username}
            </td>
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
                <button onClick={() => handleEditMember(member)}>Edit</button>
                <button onClick={() => handleDeleteMember(member.user_id)}>Delete</button>
            </td>
            {showDetails && (
                <td colSpan="14">
                    <div className="member-details">
                        <p>Join Date: {member.join_date}</p>
                        <p>Last Activity: {member.last_activity}</p>
                    </div>
                </td>
            )}
        </tr>
    );
};

export default MemberItem;