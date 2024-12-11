import React from 'react';
import MemberItem from '../MemberList/MemberItem/MemberItem';
import Pagination from '../MemberList/Pagination/Pagination';
import BulkActions from './BulkActions/BulkActions'
import './MemberList.css';

const MemberList = ({ members, onSelectMember, sortConfig, onUpdateMember, onDeleteMember }) => {
  return (
    <div className="member-list">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Username</th>
            <th>Level</th>
            <th>ilvl</th>
            <th>Character Role</th>
            <th>Guild Role</th>
            <th>Main Archetype</th>
            <th>Secondary Archetype</th>
            <th>Grandmaster Profession One</th>
            <th>Grandmaster Profession Two</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberItem
              key={member.user_id}
              member={member}
              onSelectMember={onSelectMember}
              onUpdateMember={onUpdateMember}
              onDeleteMember={onDeleteMember}
            />
          ))}
        </tbody>
      </table>
      <BulkActions />
      <Pagination />
    </div>
  );
};

export default MemberList;