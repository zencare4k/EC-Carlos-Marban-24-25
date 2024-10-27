  // Función para abrir el modal de añadir miembro
  function openAddMemberModal() {
    document.getElementById("memberForm").reset();
    document.getElementById("modalTitle").innerText = "Add New Member";
    document.getElementById("memberModal").style.display = "flex";
  }

  // Cargar datos al modal para editar
  function openEditMemberModal(member) {
    document.getElementById("user_id").value = member.user_id;
    document.getElementById("username").value = member.username;
    document.getElementById("level").value = member.level;
    document.getElementById("ilvl").value = member.ilvl;
    document.getElementById("character_role").value = member.character_role;
    document.getElementById("guild_role").value = member.guild_role;
    document.getElementById("main_archetype").value = member.main_archetype;
    document.getElementById("secondary_archetype").value = member.secondary_archetype;
    document.getElementById("email").value = member.email;
    document.getElementById("notify_email").checked = member.notify_email;

    document.getElementById("modalTitle").innerText = "Edit Member";
    document.getElementById("memberModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("memberModal").style.display = "none";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const memberData = {
      user_id: document.getElementById("user_id").value,
      username: document.getElementById("username").value,
      level: document.getElementById("level").value,
      ilvl: document.getElementById("ilvl").value,
      character_role: document.getElementById("character_role").value,
      guild_role: document.getElementById("guild_role").value,
      main_archetype: document.getElementById("main_archetype").value,
      secondary_archetype: document.getElementById("secondary_archetype").value,
      email: document.getElementById("email").value,
      notify_email: document.getElementById("notify_email").checked
    };
    const isEditing = !!memberData.user_id;
    const endpoint = isEditing ? `/api/members/${memberData.user_id}` : '/api/members';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    });

    if (response.ok) {
      loadMembers();
      closeModal();
    } else {
      alert("Error saving member data.");
    }
  }

  async function deleteMember(userId) {
    const response = await fetch(`/api/members/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      loadMembers();
      closeDeleteModal();
    } else {
      alert("Error deleting member.");
    }
  }

  function openDeleteModal(userId) {
    document.getElementById("deleteConfirmationModal").style.display = "flex";
  }

  function closeDeleteModal() {
    document.getElementById("deleteConfirmationModal").style.display = "none";
  }

  async function loadMembers() {
    const response = await fetch('/api/members');
    const members = await response.json();
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    members.forEach(member => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${member.user_id}</td>
        <td>${member.username}</td>
        <td>${member.level}</td>
        <td>${member.ilvl}</td>
        <td>${member.character_role}</td>
        <td>${member.guild_role}</td>
        <td>
          <button onclick='openEditMemberModal(${JSON.stringify(member)})'>Edit</button>
          <button onclick='deleteMember("${member.user_id}")'>Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  window.onload = loadMembers;