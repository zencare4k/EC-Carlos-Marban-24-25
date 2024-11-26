import React, { useMemo } from 'react';

const MemberList = ({ members, selectedMembers, handleSelectMember, handleEditMember, handleDeleteMember }) => {
  const renderedMembers = useMemo(() => {
    return members.map((member) => (
      <tr key={member.user_id}>
        <td>
          <input
            type="checkbox"
            checked={selectedMembers.includes(member.user_id)}
            onChange={() => handleSelectMember(member.user_id)}
          />
        </td>
        <td>{member.user_id}</td>
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
          <button className="edit" onClick={() => handleEditMember(member)}>Edit</button>
          <button className="delete" onClick={() => handleDeleteMember(member.user_id)}>Delete</button>
        </td>
      </tr>
    ));
  }, [members, selectedMembers, handleSelectMember, handleEditMember, handleDeleteMember]);

  return (
    <tbody>
      {renderedMembers}
    </tbody>
  );
};

export default React.memo(MemberList);