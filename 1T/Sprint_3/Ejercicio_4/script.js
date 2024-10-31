const API_URL1 = "http://localhost:3000";

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    const errorMessageContainer = document.getElementById("errorMessage");
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.display = "block";
}

// Función para ocultar el mensaje de error
function hideErrorMessage() {
    const errorMessageContainer = document.getElementById("errorMessage");
    errorMessageContainer.style.display = "none";
}

// Función para validar la fecha y hora
function isFutureDate(dateString) {
    const now = new Date();
    const plannedDate = new Date(dateString);
    return plannedDate > now;
}

// Función para verificar si el usuario está registrado en la guild
async function isMemberRegistered(userId) {
    try {
        const response = await fetch(`${API_URL1}/guildmembers`);
        if (response.ok) {
            const members = await response.json();
            return members.some(member => member.user_id === userId);
        } else {
            showErrorMessage("Error al obtener la lista de miembros.");
            return false;
        }
    } catch (error) {
        console.error("Error al verificar el miembro:", error);
        showErrorMessage("No se pudo verificar si el miembro está registrado.");
        return false;
    }
}

// Función para crear una nueva party
async function createParty(partyData) {
    try {
        const response = await fetch(`${API_URL1}/partyfinder/${partyData.party_size}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partyData)
        });
        
        if (response.ok) {
            const result = await response.json();
            displayParty(partyData); // Muestra la nueva party en la lista
            document.getElementById("confirmationMessage").textContent = "Party creada con éxito.";
            document.getElementById("confirmationMessage").style.display = "block";
            
            closeModalAndResetForm(); // Cerrar modal y limpiar formulario
        } else {
            showErrorMessage("No se pudo crear la party. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error creando party:", error);
        showErrorMessage("No se pudo crear la party. Inténtalo de nuevo.");
    }
}

// Función para cerrar el modal y limpiar el formulario
function closeModalAndResetForm() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("partyForm").reset(); // Limpiar los campos del formulario
    hideErrorMessage();
    document.getElementById("confirmationMessage").style.display = "none";
}

// Función para mostrar la party en la lista
function displayParty(party) {
    const partyListContainer = document.getElementById("partyListContainer");
    const listItem = document.createElement("li");
    listItem.textContent = `Party de ${party.creator_id}: ${party.party_size} jugadores, rol: ${party.party_role_creator}, empieza el ${party.planned_start}.`;
    partyListContainer.appendChild(listItem);
}

// Evento para abrir el modal
document.getElementById("openModalBtn").onclick = () => {
    document.getElementById("modal").style.display = "block";
};

// Evento para cerrar el modal manualmente
document.getElementById("closeModalBtn").onclick = closeModalAndResetForm;

// Evento para el botón "Create Party"
document.getElementById("submitPartyBtn").onclick = async () => {
    hideErrorMessage();

    const partySize = document.getElementById("partySize").value;
    const creatorId = document.getElementById("creatorId").value;
    const levelCap = parseInt(document.getElementById("levelCap").value, 10);
    const ilvlCap = parseInt(document.getElementById("ilvlCap").value, 10);
    const partyRole = document.getElementById("partyRole").value;
    const plannedStartDate = document.getElementById("plannedStartDate").value;
    const plannedStartTime = document.getElementById("plannedStartTime").value;
    const plannedStart = `${plannedStartDate}T${plannedStartTime}`;

    if (!partySize || !creatorId || !levelCap || !ilvlCap || !partyRole || !plannedStart) {
        showErrorMessage("Todos los campos son obligatorios.");
        return;
    }

    if (!isFutureDate(plannedStart)) {
        showErrorMessage("La fecha y hora deben ser futuras.");
        return;
    }

    if (levelCap <= 0 || ilvlCap <= 0) {
        showErrorMessage("El Level Cap y el Item Level Cap deben ser números enteros positivos.");
        return;
    }

    const isRegistered = await isMemberRegistered(creatorId);

    if (!isRegistered) {
        showErrorMessage("El miembro no está registrado. Solo los miembros registrados pueden crear una party.");
        return;
    }

    const newParty = {
        party_size: partySize,
        creator_id: creatorId,
        level_cap: levelCap,
        ilvl_cap: ilvlCap,
        party_role_creator: partyRole,
        planned_start: plannedStart
    };

    await createParty(newParty);
};
