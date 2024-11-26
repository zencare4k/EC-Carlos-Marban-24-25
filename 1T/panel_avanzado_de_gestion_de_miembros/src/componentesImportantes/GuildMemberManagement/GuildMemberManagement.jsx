import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import './GuildMemberManagement.css';
import FilterBar from '../FilterBar/FilterBar';
// import MemberList from '../MemberList/MemberList';
import SortControls from '../SortControls/SortControls';
import MemberItem from '../MemberItem/MemberItem';
import MemberList from '../MemberList/MemberList';
const GuildMemberManagement = () => {
  const [guildMembers, setGuildMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filters, setFilters] = useState({
    characterRole: '',
    guildRole: '',
    mainArchetype: '',
    secondaryArchetype: '',
    grandmasterProfessions: '',
    minLevel: '',
    maxLevel: '',
    minItemLevel: '',
    maxItemLevel: ''
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);

  useEffect(() => {
    const fetchGuildMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/guildmembers');
        setGuildMembers(response.data);
      } catch (error) {
        console.error('Error fetching guild members:', error);
      }
    };

    fetchGuildMembers();
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const handleSort = useCallback((key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const filteredData = useMemo(() => {
    return guildMembers.filter(item => {
      return (
        (!appliedFilters.characterRole || item.character_role.includes(appliedFilters.characterRole)) &&
        (!appliedFilters.guildRole || item.guild_role.includes(appliedFilters.guildRole)) &&
        (!appliedFilters.mainArchetype || item.main_archetype.includes(appliedFilters.mainArchetype)) &&
        (!appliedFilters.secondaryArchetype || item.secondary_archetype.includes(appliedFilters.secondaryArchetype)) &&
        (!appliedFilters.grandmasterProfessions || item.grandmaster_profession_one.includes(appliedFilters.grandmasterProfessions) || item.grandmaster_profession_two.includes(appliedFilters.grandmasterProfessions)) &&
        (!appliedFilters.minLevel || item.level >= appliedFilters.minLevel) &&
        (!appliedFilters.maxLevel || item.level <= appliedFilters.maxLevel) &&
        (!appliedFilters.minItemLevel || item.ilvl >= appliedFilters.minItemLevel) &&
        (!appliedFilters.maxItemLevel || item.ilvl <= appliedFilters.maxItemLevel)
      );
    });
  }, [guildMembers, appliedFilters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);
  
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = sortedData.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectMember = useCallback((userId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  }, []);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedMembers(guildMembers.map(member => member.user_id));
    } else {
      setSelectedMembers([]);
    }
  }, [guildMembers]);

  const handleEditMember = useCallback((member) => {
    setEditingMember(member);
    setIsEditing(true);
    setShowModal(true);
  }, []);

  const handleAddMember = useCallback(() => {
    setEditingMember({
      user_id: '',
      username: '',
      email: '',
      level: '',
      ilvl: '',
      character_role: '',
      guild_role: '',
      main_archetype: '',
      secondary_archetype: '',
      grandmaster_profession_one: '',
      grandmaster_profession_two: '',
      notify_email: true,
    });
    setIsEditing(false);
    setShowModal(true);
  }, []);

  const handleDeleteMember = useCallback(async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/guildmembers/${userId}`);
      setGuildMembers((prevMembers) =>
        prevMembers.filter((member) => member.user_id !== userId)
      );
    } catch (error) {
      console.error('Error deleting guild member:', error);
    }
  }, []);

  const handleSaveChanges = useCallback(async () => {
    if (!editingMember.email.includes('@')) {
      setErrorMessage('Email must contain @');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/guildmembers/${editingMember.user_id}`, editingMember);
        setGuildMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.user_id === editingMember.user_id ? editingMember : member
          )
        );
      } else {
        await axios.post('http://localhost:3000/guildmembers', editingMember);
        setGuildMembers((prevMembers) => [...prevMembers, editingMember]);
      }
      setShowModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving guild member:', error);
    }
  }, [editingMember, isEditing]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditingMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  }, []);

  return (
    <div className="table-container">
      <h1>Guild Members</h1>
      <button className="add-button" onClick={handleAddMember}>Add Member</button>
      <SortControls sortConfig={sortConfig} onSort={handleSort} />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} onApplyFilters={handleApplyFilters} onSelectAll={handleSelectAll} />
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>user_id</th>
            <th>username</th>
            <th>level</th>
            <th>ilvl</th>
            <th>character_role</th>
            <th>guild_role</th>
            <th>main_archetype</th>
            <th>secondary_archetype</th>
            <th>grandmaster_profession_one</th>
            <th>grandmaster_profession_two</th>
            <th>email</th>
            <th>notify_email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <MemberList
          members={currentMembers}
          selectedMembers={selectedMembers}
          handleSelectMember={handleSelectMember}
          handleEditMember={handleEditMember}
          handleDeleteMember={handleDeleteMember}
        />
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedData.length / membersPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{isEditing ? 'Edit Member' : 'Add Member'}</h2>
            <form>
              <label>
                User ID:
                <input type="text" name="user_id" value={editingMember.user_id} onChange={handleChange} disabled={isEditing} />
              </label>
              <label>
                Username:
                <input type="text" name="username" value={editingMember.username} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={editingMember.email} onChange={handleChange} />
              </label>
              <label>
                Level:
                <input type="number" name="level" value={editingMember.level} onChange={handleChange} />
              </label>
              <label>
                Item Level:
                <input type="number" name="ilvl" value={editingMember.ilvl} onChange={handleChange} />
              </label>
              <label>
                Character Role:
                <select name="character_role" value={editingMember.character_role} onChange={handleChange}>
                  <option value="TANK">TANK</option>
                  <option value="HEALER">HEALER</option>
                  <option value="DAMAGE">DAMAGE</option>
                  <option value="SUPPORT">SUPPORT</option>
                </select>
              </label>
              <label>
                Guild Role:
                <select name="guild_role" value={editingMember.guild_role} onChange={handleChange}>
                  <option value="LIDER">LIDER</option>
                  <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                  <option value="GERENTE">GERENTE</option>
                  <option value="GERENTE A2">GERENTE A2</option>
                  <option value="ALPHA 2">ALPHA 2</option>
                  <option value="MEMBER">MEMBER</option>
                </select>
              </label>
              <label>
                Main Archetype:
                <select name="main_archetype" value={editingMember.main_archetype} onChange={handleChange}>
                  <option value="BARD">BARD</option>
                  <option value="CLERIC">CLERIC</option>
                  <option value="FIGHTER">FIGHTER</option>
                  <option value="MAGE">MAGE</option>
                  <option value="RANGER">RANGER</option>
                  <option value="ROGUE">ROGUE</option>
                  <option value="SUMMONER">SUMMONER</option>
                  <option value="TANK">TANK</option>
                </select>
              </label>
              <label>
                Secondary Archetype:
                <select name="secondary_archetype" value={editingMember.secondary_archetype} onChange={handleChange}>
                  <option value="BARD">BARD</option>
                  <option value="CLERIC">CLERIC</option>
                  <option value="FIGHTER">FIGHTER</option>
                  <option value="MAGE">MAGE</option>
                  <option value="RANGER">RANGER</option>
                  <option value="ROGUE">ROGUE</option>
                  <option value="SUMMONER">SUMMONER</option>
                  <option value="TANK">TANK</option>
                </select>
              </label>
              <label>
                Grandmaster Profession One:
                <select name="grandmaster_profession_one" value={editingMember.grandmaster_profession_one} onChange={handleChange}>
                  <option value="FISHING">FISHING</option>
                  <option value="HERBALISM">HERBALISM</option>
                  <option value="HUNTING">HUNTING</option>
                  <option value="LUMBERJACKING">LUMBERJACKING</option>
                  <option value="MINING">MINING</option>
                  <option value="ALCHEMY">ALCHEMY</option>
                  <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                  <option value="COOKING">COOKING</option>
                  <option value="FARMING">FARMING</option>
                  <option value="LUMBERMILLING">LUMBERMILLING</option>
                  <option value="METALWORKING">METALWORKING</option>
                  <option value="STONECUTTING">STONECUTTING</option>
                  <option value="TANNING">TANNING</option>
                  <option value="WEAVING">WEAVING</option>
                  <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                  <option value="ARMORSMITHING">ARMORSMITHING</option>
                  <option value="CARPENTRY">CARPENTRY</option>
                  <option value="JEWELCUTTING">JEWELCUTTING</option>
                  <option value="LEATHERWORKING">LEATHERWORKING</option>
                  <option value="SCRIBE">SCRIBE</option>
                  <option value="TAILORING">TAILORING</option>
                  <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                </select>
              </label>
              <label>
                Grandmaster Profession Two:
                <select name="grandmaster_profession_two" value={editingMember.grandmaster_profession_two} onChange={handleChange}>
                  <option value="FISHING">FISHING</option>
                  <option value="HERBALISM">HERBALISM</option>
                  <option value="HUNTING">HUNTING</option>
                  <option value="LUMBERJACKING">LUMBERJACKING</option>
                  <option value="MINING">MINING</option>
                  <option value="ALCHEMY">ALCHEMY</option>
                  <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                  <option value="COOKING">COOKING</option>
                  <option value="FARMING">FARMING</option>
                  <option value="LUMBERMILLING">LUMBERMILLING</option>
                  <option value="METALWORKING">METALWORKING</option>
                  <option value="STONECUTTING">STONECUTTING</option>
                  <option value="TANNING">TANNING</option>
                  <option value="WEAVING">WEAVING</option>
                  <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                  <option value="ARMORSMITHING">ARMORSMITHING</option>
                  <option value="CARPENTRY">CARPENTRY</option>
                  <option value="JEWELCUTTING">JEWELCUTTING</option>
                  <option value="LEATHERWORKING">LEATHERWORKING</option>
                  <option value="SCRIBE">SCRIBE</option>
                  <option value="TAILORING">TAILORING</option>
                  <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                </select>
              </label>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button type="button" className="save-button" onClick={handleSaveChanges}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Removed duplicate MemberList component

export default GuildMemberManagement;