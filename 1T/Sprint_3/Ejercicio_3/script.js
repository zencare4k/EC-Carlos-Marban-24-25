// Get HTML elements
const membersTable = document.getElementById('membersTable').querySelector('tbody');
const addMemberButton = document.getElementById('addMemberButton');
const memberModal = document.getElementById('memberModal');
const closeModal = document.getElementById('closeModal');
const memberForm = document.getElementById('memberForm');
const modalTitle = document.getElementById('modalTitle');

let editingMember = null;

// Event Listeners
addMemberButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
memberForm.addEventListener('submit', saveMember);

// Fetch Members
async function fetchMembers() {
  try {
    const response = await fetch('/api/guild/members'); // Change this to your actual endpoint
    const members = await response.json();
    renderMembersTable(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

// Render Table
function renderMembersTable(members) {
  membersTable.innerHTML = '';
  members.forEach(member => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${member.user_id}</td>
      <td>${member.username}</td>
      <td>${member.level}</td>
      <td>${member.ilvl}</td>
      <td>${member.character_role}</td>
      <td>${member.guild_role}</td>
      <td>
        <button onclick="editMember('${member.user_id}')">Edit</button>
        <button onclick="deleteMember('${member.user_id}')">Delete</button>
      </td>
    `;
    membersTable.appendChild(row);
  });
}

// Open Modal
function openModal() {
  editingMember = null;
  memberForm.reset();
  modalTitle.textContent = "Add New Member";
  memberModal.style.display = 'flex';
}

// Close Modal
function closeModalFunc() {
  memberModal.style.display = 'none';
}

// Save Member (Add or Update)
async function saveMember(event) {
  event.preventDefault();
  
  const member = {
    user_id: memberForm.user_id.value,
    username: memberForm.username.value,
    level: parseInt(memberForm.level.value),
    ilvl: parseInt(memberForm.ilvl.value),
    character_role: memberForm.character_role.value,
    guild_role: memberForm.guild_role.value,
    email: memberForm.email.value
  };

  const endpoint = editingMember ? `/api/guild/members/${member.user_id}` : '/api/guild/members';
  const method = editingMember ? 'PUT' : 'POST';

  try {
    await fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member)
    });
    
    closeModalFunc();
    fetchMembers(); // Update table with the new data
  } catch (error) {
    console.error('Error saving member:', error);
  }
}

// Edit Member
async function editMember(user_id) {
  try {
    const response = await fetch(`/api/guild/members/${user_id}`);
    const member = await response.json();
    
    editingMember = user_id;
    modalTitle.textContent = "Edit Member";
    memberForm.user_id.value = member.user_id;
    memberForm.username.value = member.username;
    memberForm.level.value = member.level;
    memberForm.ilvl.value = member.ilvl;
    memberForm.character_role.value = member.character_role;
    memberForm.guild_role.value = member.guild_role;
    memberForm.email.value = member.email;

    memberModal.style.display = 'flex';
  } catch (error) {
    console.error('Error fetching member for edit:', error);
  }
}

// Delete Member
async function deleteMember(user_id) {
  if (confirm('Are you sure you want to delete this member?')) {
    try {
      await fetch(`/api/guild/members/${user_id}`, { method: 'DELETE' });
      fetchMembers(); // Update table after deletion
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  }
}

// Initialize Members Data
fetchMembers();
