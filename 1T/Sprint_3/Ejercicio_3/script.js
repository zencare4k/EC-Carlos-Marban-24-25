// URL base de la API
const API_BASE_URL = "http://localhost:3000/guildmembers";

// Variables globales
let members = []; // Inicializa la lista de miembros
const memberTable = document.getElementById("memberTable");
const modal = document.getElementById("myModal");
const closeModalBtn = document.querySelector(".close");
const addMemberBtn = document.getElementById("addMemberBtn"); // Corregido para el botón de agregar
let editingIndex = null; // Índice del miembro que se está editando

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
        <th>Email</th>
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
            <td>${member.email} Error </td>
            <td>${member.grandmaster_profession_one}, ${member.grandmaster_profession_two}</td>
            <td>
                <button onclick="prepareEditMember(${index})">Edit</button>
                <button onclick="deleteMember('${member.user_id}')">Delete</button>
            </td>`;
        memberTable.appendChild(row);
    });
}

// Añadir nuevo miembro o actualizar miembro existente mediante la API
async function addOrUpdateMember() {
    const member = collectMemberData();
    if (!validateMember(member)) return; // Validación inicial

    try {
        let response;
        if (editingIndex !== null) {
            // Actualizar miembro existente
            response = await fetch(`${API_BASE_URL}/${member.user_id}`, {
                method: "PUT", // Cambiar a PUT para actualización
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(member),
            });
            alert("Miembro actualizado con éxito.");
        } else {
            // Añadir nuevo miembro
            response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(member),
            });
            alert("Miembro agregado con éxito.");
        }

        if (response.ok) {
            fetchMembers(); // Actualizar lista
            resetForm(); // Restablecer el formulario
            closeModal(); // Cerrar el modal
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.message);
        }
    } catch (error) {
        console.error("Error adding/updating member:", error);
    }
}

// Recoger datos del formulario
function collectMemberData() {
    return {
        user_id: document.getElementById("user_id").value,
        username: document.getElementById("username").value,
        level: document.getElementById("level").value || 0,
        ilvl: document.getElementById("ilvl").value || 0,
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

// Validar datos del miembro
function validateMember(member) {
    if (!member.email.includes("@")) {
        alert("Error: el formato del email es inválido.");
        return false;
    }
    if (!member.username || !member.user_id) {
        alert("Error: el nombre de usuario y el ID de usuario no pueden estar vacíos.");
        return false;
    }
    return true;
}

// Eliminar miembro mediante la API
async function deleteMember(user_id) {
    if (confirm("¿Estás seguro de que deseas eliminar a este miembro?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/${user_id}`, { method: "DELETE" });
            if (response.ok) {
                alert("Miembro eliminado con éxito.");
                fetchMembers(); // Actualizar lista
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
    editingIndex = index; // Guardar el índice del miembro que se está editando
    openModal(); // Abrir modal para editar
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

// Restablecer formulario
function resetForm() {
    document.getElementById("user_id").value = '';
    document.getElementById("username").value = '';
    document.getElementById("level").value = '';
    document.getElementById("ilvl").value = '';
    document.getElementById("character_role").value = '';
    document.getElementById("guild_role").value = '';
    document.getElementById("main_archetype").value = '';
    document.getElementById("secondary_archetype").value = '';
    document.getElementById("grandmaster_profession_one").value = '';
    document.getElementById("grandmaster_profession_two").value = '';
    document.getElementById("email").value = '';
    document.getElementById("notify_email").checked = false;
    editingIndex = null; // Resetear el índice de edición
}

// Abrir el modal
function openModal() {
    modal.style.display = "block";
}

// Cerrar el modal
function closeModal() {
    modal.style.display = "none";
    resetForm(); // Limpiar el formulario al cerrar el modal
}

// Manejar el evento de clic en el botón para abrir el modal
addMemberBtn.onclick = openModal;

// Manejar el evento de clic en el botón de cerrar modal
closeModalBtn.onclick = closeModal;

// Manejar el evento de clic en el botón para añadir o actualizar miembro
document.getElementById("addMemberButton").onclick = addOrUpdateMember; // Cambiado para usar la nueva función

// Inicializar la lista de miembros al cargar la página
fetchMembers();
