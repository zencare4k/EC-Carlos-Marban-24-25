import React, { useState, useEffect } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import SortControls from '../SortControls/SortControls';
import MemberList from '../MemberList/MemberList';
import BulkActions from '../BulkActions/BulkActions';
import MemberDetailsModal from '../MemberDetailsModal/MembersDetailsModal';
import MemberEditModal from '../MemberEditModal/MemberEditModal';
import Pagination from '../Pagination/Pagination';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import { getAllMembers, createMember, updateMember, deleteMember } from '../../Services/members_api';
import '../NotificationSystem/NotificationSystem.css'; // Import the CSS
import '../ConfirmationDialog/ConfirmationDialog.css'; // Import the CSS
import '../MemberDetailsModal/MemberDetailsModal.css'; // Import the CSS
import '../MemberEditModal/MemberEditModal.css'; // Import the CSS
import '../MemberList/MemberList.css'; // Import the CSS
import '../FilterBar/FilterBar.css'; // Import the CSS
import '../SortControls/SortControls.css'; // Import the CSS
import '../BulkActions/BulkActions.css'; // Import the CSS
import '../Pagination/Pagination.css'; // Import the CSS
import './GuildMemberManagement.css'; // Import the CSS

const GuildMemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [notification, setNotification] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        setNotification({ type: 'error', message: 'Error fetching members' });
      }
    };
    fetchMembers();
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = members.filter(member => {
      // Implement filter logic based on filters
      // Example: return member.level >= filters.level;
      return true; // Placeholder, replace with actual filter logic
    });
    setFilteredMembers(filtered);
  };

  const handleSortChange = (key, direction) => {
    setSortConfig({ key, direction });
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredMembers(sortedMembers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
  };

  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map((member) => member.user_id));
    }
  };

  const handleBulkAction = (action) => {
    // Implement bulk action logic here
    // Example: delete selected members
    if (action === 'delete') {
      selectedMembers.forEach(async (memberId) => {
        await deleteMember(memberId);
      });
      setMembers((prevMembers) => prevMembers.filter((member) => !selectedMembers.includes(member.user_id)));
      setFilteredMembers((prevMembers) => prevMembers.filter((member) => !selectedMembers.includes(member.user_id)));
      setSelectedMembers([]);
      setNotification({ type: 'success', message: 'Selected members deleted successfully' });
    }
  };

  const handleMemberEdit = (member) => {
    setCurrentMember(member);
    setShowEditModal(true);
  };

  const handleMemberDelete = (memberId) => {
    setMemberToDelete(memberId);
    setShowConfirmationDialog(true);
  };

  const confirmDeleteMember = async () => {
    try {
      await deleteMember(memberToDelete);
      setMembers((prevMembers) => prevMembers.filter((member) => member.user_id !== memberToDelete));
      setFilteredMembers((prevMembers) => prevMembers.filter((member) => member.user_id !== memberToDelete));
      setNotification({ type: 'success', message: 'Member deleted successfully' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error deleting member' });
    } finally {
      setShowConfirmationDialog(false);
      setMemberToDelete(null);
    }
  };

  const handleSaveMember = async (member) => {
    try {
      if (member.user_id) {
        await updateMember(member.user_id, member);
        setMembers((prevMembers) =>
          prevMembers.map((m) => (m.user_id === member.user_id ? member : m))
        );
        setFilteredMembers((prevMembers) =>
          prevMembers.map((m) => (m.user_id === member.user_id ? member : m))
        );
        setNotification({ type: 'success', message: 'Member updated successfully' });
      } else {
        const newMember = await createMember(member);
        setMembers((prevMembers) => [...prevMembers, newMember]);
        setFilteredMembers((prevMembers) => [...prevMembers, newMember]);
        setNotification({ type: 'success', message: 'Member created successfully' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error saving member' });
    } finally {
      setShowEditModal(false);
      setShowAddModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowAddModal(true)}>Add Members</button>
      <FilterBar onFilterChange={handleFilterChange} />
      <SortControls sortConfig={sortConfig} onSortChange={handleSortChange} />
      <BulkActions selectedMembers={selectedMembers} onBulkAction={handleBulkAction} />
      <MemberList
        members={filteredMembers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onMemberSelect={handleMemberSelect}
        onSelectAll={handleSelectAll}
        onEdit={handleMemberEdit}
        onDelete={handleMemberDelete}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredMembers.length}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      {showDetailsModal && (
        <MemberDetailsModal member={currentMember} onClose={() => setShowDetailsModal(false)} />
      )}
      {showEditModal && (
        <MemberEditModal
          member={currentMember}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveMember}
        />
      )}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveMember}
        />
      )}
      {showConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this member?"
          onConfirm={confirmDeleteMember}
          onCancel={() => setShowConfirmationDialog(false)}
        />
      )}
      {notification && (
        <NotificationSystem
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

const AddMemberModal = ({ onClose, onSave }) => {
  const [memberData, setMemberData] = useState({
    user_id: '',
    username: '',
    level: 0,
    ilvl: 0,
    character_role: 'TANK',
    guild_role: 'MEMBER',
    main_archetype: 'BARD',
    secondary_archetype: 'BARD',
    grandmaster_profession_one: 'FISHING',
    grandmaster_profession_two: 'FISHING',
    email: '',
    notify_email: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(memberData);
    setMemberData({
      user_id: '',
      username: '',
      level: 0,
      ilvl: 0,
      character_role: 'TANK',
      guild_role: 'MEMBER',
      main_archetype: 'BARD',
      secondary_archetype: 'BARD',
      grandmaster_profession_one: 'FISHING',
      grandmaster_profession_two: 'FISHING',
      email: '',
      notify_email: false,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input type="text" name="user_id" value={memberData.user_id} onChange={handleChange} required />
          </label>
          <label>
            Username:
            <input type="text" name="username" value={memberData.username} onChange={handleChange} required />
          </label>
          <label>
            Level:
            <input type="number" name="level" value={memberData.level} onChange={handleChange} required />
          </label>
          <label>
            Item Level:
            <input type="number" name="ilvl" value={memberData.ilvl} onChange={handleChange} required />
          </label>
          <label>
            Character Role:
            <select name="character_role" value={memberData.character_role} onChange={handleChange} required>
              <option value="TANK">TANK</option>
              <option value="HEALER">HEALER</option>
              <option value="DAMAGE">DAMAGE</option>
              <option value="SUPPORT">SUPPORT</option>
            </select>
          </label>
          <label>
            Guild Role:
            <select name="guild_role" value={memberData.guild_role} onChange={handleChange} required>
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
            <select name="main_archetype" value={memberData.main_archetype} onChange={handleChange} required>
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
            <select name="secondary_archetype" value={memberData.secondary_archetype} onChange={handleChange} required>
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
            <select name="grandmaster_profession_one" value={memberData.grandmaster_profession_one} onChange={handleChange} required>
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
            <select name="grandmaster_profession_two" value={memberData.grandmaster_profession_two} onChange={handleChange} required>
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
            Email:
            <input type="email" name="email" value={memberData.email} onChange={handleChange} required />
          </label>
          <label>
            Notify Email:
            <input type="checkbox" name="notify_email" checked={memberData.notify_email} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default GuildMemberManagement;