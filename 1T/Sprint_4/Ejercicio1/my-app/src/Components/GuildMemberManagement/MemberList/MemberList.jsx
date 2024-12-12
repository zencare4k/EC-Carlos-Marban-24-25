
import React, { useState, useEffect } from 'react';
import { getAllGuildMembers } from '../../../Services/guildmembers_API';
import MemberItem from '../MemberList/MemberItem/MemberItem';
import Pagination from '../MemberList/Pagination/Pagination';
import BulkActions from './BulkActions/BulkActions';
import './MemberList.css';
const MemberList = ({ onSave, onEdit, onDelete, onViewDetails, onSelectMember = () => {} }) => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllGuildMembers();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handlePageChange = (page, newLimit) => {
    setCurrentPage(page);
    setLimit(newLimit);
  };

  const startIndex = (currentPage - 1) * limit;
  const currentMembers = members.slice(startIndex, startIndex + limit);

  return (
    <div className="member-list">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Username</th>
            <th>User ID</th>
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
          {currentMembers.map((member) => (
            <MemberItem
              key={member.user_id}
              member={member}
              onEdit={onEdit}
              onSave={onSave}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
              onSelect={onSelectMember}
            />
          ))}
        </tbody>
      </table>
      <BulkActions />
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
};

export default MemberList;