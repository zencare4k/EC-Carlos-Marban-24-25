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
        <th>Main Archetype</th>
        <th>Secondary Archetype</th>
        <th>Grandmaster Professions</th>
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
            <td>${member.main_archetype}</td>
            <td>${member.secondary_archetype}</td>
            <td>${member.grandmaster_profession_one}, ${member.grandmaster_profession_two}</td>
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
            hideForm();      // Ocultar el formulario después de la acción
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
        main_archetype: document.getElementById("main_archetype").value,
        secondary_archetype: document.getElementById("secondary_archetype").value,
        grandmaster_profession_one: document.getElementById("grandmaster_profession_one").value,
        grandmaster_profession_two: document.getElementById("grandmaster_profession_two").value,
        email: document.getElementById("email").value,
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
function prepareEditMember(index) {
    const member = members[index];
    fillForm(member);
    editingMemberId = member.user_id; // Guardar ID del miembro a editar
    showForm(); // Mostrar formulario en modo edición
}

// Actualizar miembro en la API
async function updateMember() {
    if (!editingMemberId) return; // Salir si no hay un miembro en edición

    const updatedMember = collectMemberData();
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
            hideForm();      // Ocultar el formulario después de la acción
            editingMemberId = null; // Resetear la variable de edición
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
    document.getElementById("main_archetype").value = member.main_archetype;
    document.getElementById("secondary_archetype").value = member.secondary_archetype;
    document.getElementById("grandmaster_profession_one").value = member.grandmaster_profession_one;
    document.getElementById("grandmaster_profession_two").value = member.grandmaster_profession_two;
    document.getElementById("email").value = member.email;
    document.getElementById("notify_email").checked = member.notify_email;
}

// Validar datos del miembro
function validateMember(member) {
    if (!member.email.includes("@")) {
        alert("Error: Email format is invalid.");
        return false;
    }
    if (!member.username || !member.user_id) {
        alert("Error: Username and User ID cannot be empty.");
        return false;
    }
    return true;
}

// Restablecer formulario
function resetForm() {
    document.getElementById("memberForm").reset();
    editingMemberId = null; // Resetear solo si se completa la operación
}

// Configuración inicial
document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();  // Obtener todos los miembros
    document.getElementById("showFormButton").onclick = () => {
        resetForm();
        showForm();
    };
});

// Funciones para mostrar y ocultar el formulario
function showForm() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideForm() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// URL base para la API de parties
const PARTY_API_URL = "http://localhost:3000/partyfinder";
let parties = []; // Variable para almacenar las parties obtenidas
let editingPartyId = null; // ID de la party en edición

// Validar formato de fecha y hora (DD/MM/YYYY_HH:mm)
function isValidDateTime(dateTimeStr) {
    const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4}_\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(dateTimeStr)) return false;

    const [datePart, timePart] = dateTimeStr.split('_');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);

    return date > new Date(); // Verificar que la fecha sea futura
}

// Mostrar formulario de creación de parties
function showPartyForm() {
    document.getElementById('partyPopup').classList.add('active');
    document.getElementById('partyOverlay').classList.add('active');
}

// Ocultar formulario de creación de parties
function hidePartyForm() {
    document.getElementById('partyPopup').classList.remove('active');
    document.getElementById('partyOverlay').classList.remove('active');
    document.getElementById('partyForm').reset();
    editingPartyId = null; // Reiniciar el ID de edición
}

// Función para obtener parties y mostrarlas en la tabla
async function fetchParties() {
    try {
        const response = await fetch(PARTY_API_URL);
        const data = await response.json();
        parties = data;
        displayParties();
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}

// Función para mostrar las parties en la tabla
function displayParties() {
    const partyTableBody = document.getElementById('partyTable').querySelector('tbody');
    partyTableBody.innerHTML = ''; // Limpiar tabla
    parties.forEach((party, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${party.party_size}</td>
            <td>${party.creator_id}</td>
            <td>${party.level_cap}</td>
            <td>${party.ilvl_cap}</td>
            <td>${party.party_role}</td>
            <td>${party.planned_start}</td>
            <td>
                <button onclick="prepareEditParty(${index})">Edit</button>
                <button onclick="deleteParty('${party.id}')">Delete</button>
            </td>`;
        partyTableBody.appendChild(row);
    });
}

// Crear una nueva party
async function createParty(event) {
    event.preventDefault();

    const party = {
        party_size: document.getElementById("party_size").value,
        creator_id: document.getElementById("creator_id").value,
        level_cap: parseInt(document.getElementById("level_cap").value),
        ilvl_cap: parseInt(document.getElementById("ilvl_cap").value),
        party_role: document.getElementById("party_role").value,
        planned_start: document.getElementById("planned_start").value,
    };

    if (!isValidDateTime(party.planned_start)) {
        alert("Error: Planned Start must be a future date in DD/MM/YYYY_HH:mm format.");
        return;
    }

    try {
        const response = await fetch(PARTY_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(party),
        });

        if (response.ok) {
            alert("Party created successfully.");
            fetchParties(); // Refrescar la lista de parties
            hidePartyForm(); // Cerrar el formulario
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.message);
        }
    } catch (error) {
        console.error("Error creating party:", error);
    }
}

// Preparar edición de una party
function prepareEditParty(index) {
    const party = parties[index];
    document.getElementById("party_size").value = party.party_size;
    document.getElementById("creator_id").value = party.creator_id;
    document.getElementById("level_cap").value = party.level_cap;
    document.getElementById("ilvl_cap").value = party.ilvl_cap;
    document.getElementById("party_role").value = party.party_role;
    document.getElementById("planned_start").value = party.planned_start;
    editingPartyId = party.id;
    showPartyForm();
}

// Eliminar una party
async function deleteParty(id) {
    if (confirm("Are you sure you want to delete this party?")) {
        try {
            const response = await fetch(`${PARTY_API_URL}/${id}`, { method: "DELETE" });
            if (response.ok) {
                alert("Party deleted successfully.");
                fetchParties(); // Refrescar la lista de parties
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.message);
            }
        } catch (error) {
            console.error("Error deleting party:", error);
        }
    }
}

// Llamar a la función para cargar parties al inicio
fetchParties();
