import React, { useState, useEffect } from 'react';
import FilterBar from '../GuildMemberManagement/FilterBar/FilterBar';
import SortControls from '../GuildMemberManagement/SortControls/SortControls';
import CreateMember from '../GuildMemberManagement/CreateMember/CreateMember';
import MemberList from '../GuildMemberManagement/MemberList/MemberList';
import BulkActions from '../GuildMemberManagement/MemberList/BulkActions/BulkActions';
import { getAllGuildMembers, createGuildMember, updateGuildMember,  getMembersByCharacterRole, getMembersWithLevelGreaterThan, getMembersWithIlvlGreaterThan } from '../../Services/guildmembers_API';
import './GuildMemberManagement.css';

const GuildMemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getAllGuildMembers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error('Error fetching guild members:', error);
    }
  };

  const handleFilter = async (filters) => {
    try {
      let filtered = [...members];
      if (filters.character_role) {
        const data = await getMembersByCharacterRole(filters.character_role);
        filtered = data;
      }
      if (filters.level) {
        const data = await getMembersWithLevelGreaterThan(filters.level);
        filtered = data;
      }
      if (filters.ilvl) {
        const data = await getMembersWithIlvlGreaterThan(filters.ilvl);
        filtered = data;
      }
      setFilteredMembers(filtered);
    } catch (error) {
      console.error('Error filtering members:', error);
    }
  };

  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
    let sortedMembers = [...filteredMembers];
    if (sortConfig.key) {
      sortedMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    setFilteredMembers(sortedMembers);
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prevSelected => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter(id => id !== memberId);
      } else {
        return [...prevSelected, memberId];
      }
    });
  };

  const handleBulkActionComplete = () => {
    fetchMembers();
    setSelectedMembers([]);
  };

  const handleCreateMember = async (memberData) => {
    try {
      await createGuildMember(memberData);
      fetchMembers();
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const handleUpdateMember = async (userId, memberData) => {
    try {
      await updateGuildMember(userId, memberData);
      fetchMembers();
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="guild-member-management">
      <FilterBar onFilter={handleFilter} />
      <SortControls onSort={handleSort} />
      <CreateMember onCreate={handleCreateMember} />
      <BulkActions selectedMembers={selectedMembers} onActionComplete={handleBulkActionComplete} />
      <MemberList
        members={filteredMembers}
        onSelectMember={handleSelectMember}
        sortConfig={sortConfig}
        onUpdateMember={handleUpdateMember}
      />
    </div>
  );
};

export default GuildMemberManagement;