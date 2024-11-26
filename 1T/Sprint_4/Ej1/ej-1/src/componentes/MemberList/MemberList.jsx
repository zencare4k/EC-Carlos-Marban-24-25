import React from 'react';
import MemberItem from '../MemberItem/MemberItem';
import './MemberList.css';
const MemberList = ({ members, currentPage, itemsPerPage, onMemberSelect, onSelectAll, onEdit, onDelete }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMembers = members.slice(startIndex, startIndex + itemsPerPage);

  return (
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" onChange={onSelectAll} /></th>
          <th>Username</th>
          <th>Level</th>
          <th>Item Level</th>
          <th>Character Role</th>
          <th>Guild Role</th>
          <th>Main Archetype</th>
          <th>Secondary Archetype</th>
          <th>Grandmaster Profession One</th>
          <th>Grandmaster Profession Two</th>
          <th>Email</th>
          <th>Notify Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {selectedMembers.map((member) => (
          <MemberItem
            key={member.user_id}
            member={member}
            onSelect={onMemberSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MemberList;