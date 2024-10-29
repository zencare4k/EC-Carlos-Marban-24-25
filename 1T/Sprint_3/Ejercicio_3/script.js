// URL base de la API
const API_BASE_URL = "http://localhost:3000/guildmembers";

// Variables globales
let editingMemberId = null; // Para saber si estamos en modo edición
let members = []; // Inicializar la lista de miembros
const memberTable = document.createElement('table');
document.body.appendChild(memberTable);  // Para visualizar la tabla en el HTML

// Obtener todos los miembros desde la API
async function fetchMembers() {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        members = data;
        displayMembers();
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// Función para mostrar todos los miembros en la tabla
function displayMembers() {
    memberTable.innerHTML = `<tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Level</th>
        <th>ILVL</th>
        <th>Character Role</th>
        <th>Guild Role</th>
        <th>Role</th>
        <th>Main Archetype</th>
        <th>Secondary Archetype</th>
        <th>Grandmaster Professions</th>
        <th>Email</th>
        <th>Actions</th>
    </tr>`;
    
    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.user_id}</td>
            <td>${member.username}</td>
            <td>${member.level}</td>
            <td>${member.ilvl}</td>
            <td>${member.character_role}</td>
            <td>${member.guild_role}</td>
            <td>${member.role || ''}</td> <!-- Ajuste para evitar undefined -->
            <td>${member.main_archetype}</td>
            <td>${member.secondary_archetype}</td>
            <td>${member.grandmaster_profession_one}, ${member.grandmaster_profession_two}</td>
            <td>${member.email || ''}</td> <!-- Ajuste para evitar undefined -->
            <td>
                <button onclick="prepareEditMember(${index})">Edit</button>
                <button onclick="deleteMember('${member.user_id}')">Delete</button>
            </td>`;
        memberTable.appendChild(row);
    });
}

// Añadir nuevo miembro mediante la API
async function addMember() {
    const member = collectMemberData();
    console.log("Datos del miembro a enviar:", member); // Log para depuración
    if (!validateMember(member)) return;  // Validación inicial

    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member),
        });

        if (response.ok) {
            alert("Member added successfully.");
            fetchMembers();  // Actualizar lista
            resetForm();     // Restablecer el formulario solo después de agregar
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.message);
        }
    } catch (error) {
        console.error("Error adding member:", error);
    }
}

// Recoger datos del formulario
function collectMemberData() {
    return {
        user_id: document.getElementById("user_id").value,
        username: document.getElementById("username").value,
        level: document.getElementById("level").value,
        ilvl: document.getElementById("ilvl").value,
        character_role: document.getElementById("character_role").value,
        guild_role: document.getElementById("guild_role").value,
        role: document.getElementById("role").value || '',  // Ajuste para evitar undefined
        main_archetype: document.getElementById("main_archetype").value,
        secondary_archetype: document.getElementById("secondary_archetype").value,
        grandmaster_profession_one: document.getElementById("grandmaster_profession_one").value,
        grandmaster_profession_two: document.getElementById("grandmaster_profession_two").value,
        email: document.getElementById("email").value || '',  // Ajuste para evitar undefined
        notify_email: document.getElementById("notify_email").checked
    };
}

// Eliminar miembro mediante la API
async function deleteMember(user_id) {
    if (confirm("Are you sure you want to delete this member?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/${user_id}`, { method: "DELETE" });
            if (response.ok) {
                alert("Member deleted successfully.");
                fetchMembers();  // Actualizar lista
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.message);
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    }
}

// Preparar edición de miembro
async function prepareEditMember(index) {
    const member = members[index];
    fillForm(member);
    editingMemberId = member.user_id; // Guardar ID del miembro a editar
    document.getElementById("addMemberBtn").textContent = "Update Member";
    document.getElementById("addMemberBtn").onclick = updateMember;
}

// Actualizar miembro en la API
async function updateMember() {
    if (!editingMemberId) return; // Salir si no hay un miembro en edición

    const updatedMember = collectMemberData();
    console.log("Datos del miembro actualizados:", updatedMember); // Log para depuración
    if (!validateMember(updatedMember)) return;  // Validación inicial

    try {
        const response = await fetch(`${API_BASE_URL}/${editingMemberId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMember),
        });

        if (response.ok) {
            alert("Member updated successfully.");
            fetchMembers();  // Actualizar lista
            resetForm();     // Restablecer el formulario solo después de actualizar
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.message);
        }
    } catch (error) {
        console.error("Error updating member:", error);
    }
}
    
// Llenar formulario con datos de un miembro específico
function fillForm(member) {
    document.getElementById("user_id").value = member.user_id;
    document.getElementById("username").value = member.username;
    document.getElementById("level").value = member.level;
    document.getElementById("ilvl").value = member.ilvl;
    document.getElementById("character_role").value = member.character_role;
    document.getElementById("guild_role").value = member.guild_role;
    document.getElementById("role").value = member.role || '';  // Ajuste para evitar undefined
    document.getElementById("main_archetype").value = member.main_archetype;
    document.getElementById("secondary_archetype").value = member.secondary_archetype;
    document.getElementById("grandmaster_profession_one").value = member.grandmaster_profession_one;
    document.getElementById("grandmaster_profession_two").value = member.grandmaster_profession_two;
    document.getElementById("email").value = member.email || '';  // Ajuste para evitar undefined
    document.getElementById("notify_email").checked = member.notify_email;
}

// Validar datos del miembro
function validateMember(member) {
    if (!member.email.includes("@")) {
        alert("Error: Email format is invalid.");
        return false;
    }
    if (!member.username || !member.user_id || !member.role) {
        alert("Error: Username, User ID and Role cannot be empty.");
        return false;
    }
    return true;
}

// Restablecer formulario
function resetForm() {
    document.getElementById("user_id").value = '';
    document.getElementById("username").value = '';
    document.getElementById("level").value = '';
    document.getElementById("ilvl").value = '';
    document.getElementById("character_role").value = '';
    document.getElementById("guild_role").value = '';
    document.getElementById("role").value = '';
    document.getElementById("main_archetype").value = '';
    document.getElementById("secondary_archetype").value = '';
    document.getElementById("grandmaster_profession_one").value = '';
    document.getElementById("grandmaster_profession_two").value = '';
    document.getElementById("email").value = '';
    document.getElementById("notify_email").checked = false;
    editingMemberId = null; // Resetear solo si se completa la operación
    document.getElementById("addMemberBtn").textContent = "Add Member";
    document.getElementById("addMemberBtn").onclick = addMember;
}

// Configuración inicial
document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();  // Obtener todos los miembros
    document.getElementById("addMemberBtn").onclick = addMember;
});
