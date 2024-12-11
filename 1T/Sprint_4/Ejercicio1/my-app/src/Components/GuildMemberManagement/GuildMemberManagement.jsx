// src/components/GuildMemberManagement/GuildMemberManagement.jsx
import React, { useState, useEffect } from "react";

import FilterBar from './FilterBar/FilterBar';
import SortControls from './SortControls/SortControls';
import MemberList from './MemberList/MemberList';
import { getAllGuildMembers, deleteGuildMember, createGuildMember } from "../../Services/guildmembers_API";
import './GuildMemberManagement.css';
import NotificationSystem from '../General/NoitficationSystem/NotificationSystem';
import ConfirmationDialog from '../General/ConfirmationDialog/ConfirmationDialog';
import CreateMember from './CreateMember/CreateMember';

const GuildMemberManagement = () => {
  // Administra el estado global relacionado con la gestión de miembros.
  // Maneja la comunicación con los componentes secundarios que tiene para que se integren adecuadamente.
  
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    sortColumn: "username",
    sortOrder: "asc",
  });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);
  const [isConfirmDeleteSingleOpen, setIsConfirmDeleteSingleOpen] = useState(false);
  const [inputErrors, setInputErrors] = useState({ ilv: "", lvl: "" });
  const [ilv, setIlv] = useState("");
  const [lvl, setLvl] = useState("");

  // Removed unused teamRequirements variable

  const applySorting = () => {
    const { sortColumn, sortOrder } = sortConfig;
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredMembers(sortedMembers);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    applySorting();
  }, [sortConfig, members]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoRefresh();
    }, 60000); // Actualiza cada 60 segundos
  
    return () => clearInterval(interval);
  }, []);

  const autoRefresh = async () => {
    try {
      const data = await getAllGuildMembers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error("Error auto-refreshing members:", error);
    }
  };

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllGuildMembers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error("Error loading members:", error);
      if (error.code === 'ECONNREFUSED') {
        setNotification("Error de conexión a la base de datos. Por favor, inténtelo de nuevo más tarde.");
      } else {
        setNotification("Error al cargar los miembros.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSortChange = (column, order) => {
    setSortConfig({
      sortColumn: column,
      sortOrder: order,
    });
  };

  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = members.filter((member) => {
      return (
        (!newFilters.username || member.username.includes(newFilters.username)) &&
        (!newFilters.user_Id || member.user_Id.includes(newFilters.user_Id)) &&
        (!newFilters.character_role || member.character_role === newFilters.character_role) &&
        (!newFilters.guild_role || member.guild_role === newFilters.guild_role) &&
        (!newFilters.main_archetype || member.main_archetype === newFilters.main_archetype) &&
        (!newFilters.secondary_archetype || member.secondary_archetype === newFilters.secondary_archetype) &&
        (!newFilters.grandmaster_profession_one || member.grandmaster_profession_one === newFilters.grandmaster_profession_one) &&
        (!newFilters.grandmaster_profession_two || member.grandmaster_profession_two === newFilters.grandmaster_profession_two) &&
        (!newFilters.min_level || member.level >= newFilters.min_level)
      );
    });
    setFilteredMembers(filtered);
  };

  const handleSelectMember = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSendMessage = async () => {
    // Lógica para enviar mensaje a los miembros seleccionados
  };

  const handleChangeRole = async () => {
    // Lógica para cambiar el rol de los miembros seleccionados
  };

  const handleEdit = (member) => {
    setSelectedMember({ ...member, user_id: parseInt(member.user_id, 10) });
    setIsConfirmEditOpen(true);
  };

  const handleViewDetails = (id) => {
    const member = members.find((m) => m.user_id === parseInt(id, 10));
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteSingleMember = (id) => {
    setSelectedMember(members.find((m) => m.user_id === parseInt(id, 10)));
    setIsConfirmDeleteSingleOpen(true);
  };

  const onEditConfirmed = () => {
    setIsEditModalOpen(true);
    setIsConfirmEditOpen(false);
  };

  const onDeleteSingleConfirmed = async () => {
    try {
      await deleteGuildMember([selectedMember.user_id]);
      loadMembers();
      setNotification("Miembro eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el miembro:", error);
      setNotification("Error al eliminar el miembro.");
    }
    setIsConfirmDeleteSingleOpen(false);
  };



  const handleAddMember = async (newMember) => {
    try {
      if (members.some(member => member.user_id === newMember.user_id)) {
        setNotification("Error: El ID de usuario ya existe. Por favor, elija un ID diferente.");
        return;
      }
      const addedMember = await createGuildMember(newMember);
      setMembers((prevMembers) => [...prevMembers, addedMember]);
      setFilteredMembers((prevFilteredMembers) => [...prevFilteredMembers, addedMember]);
      setNotification("Miembro añadido correctamente."); // Notificación de éxito
      applySorting(); // Aplicar la ordenación después de añadir el nuevo miembro
    } catch (error) {
      console.error("Error al añadir el miembro:", error);
      setNotification("Error al añadir el miembro."); // Notificación de error
    }
  };

  const handleDeleteMembers = async () => {
    setIsConfirmDeleteOpen(true);
  };

  const onDeleteConfirmed = async () => {
    try {
      await deleteGuildMember(selectedMembers.map(id => parseInt(id, 10)));
      loadMembers();
      setNotification("Miembros eliminados correctamente.");
    } catch (error) {
      console.error("Error deleting members:", error);
      setNotification("Error al eliminar los miembros.");
    }
    setIsConfirmDeleteOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ilv") {
      setIlv(value);
    } else if (name === "lvl") {
      setLvl(value);
    }
    if (name === "ilv" || name === "lvl") {
      if (isNaN(value)) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Este carácter no es un número.",
        }));
      } else {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    // ...existing code...
  };

  return (
    <div className="container" style={{ marginTop: '60px' }}>
     
      <h1>Guild Member Management</h1>

      {isLoading ? (
        <div>Loading members...</div>
      ) : (
        <>
          <FilterBar filters={filters} onFilterChange={onFilterChange} />
          
          <SortControls
            sortConfig={sortConfig}
            onSortChange={onSortChange}
            columns={["username", "level", "character_role"]}
          />

          <button onClick={() => setIsAddModalOpen(true)} className="add-member-button">
            Add Member
          </button>

          <MemberList
            members={filteredMembers} // Lista de miembros paginados
            onEdit={handleEdit} // Manejar edición
            onDelete={handleDeleteSingleMember} // Manejar eliminación
            onViewDetails={handleViewDetails} // Ver detalles
            onSelect={handleSelectMember} // Manejar selección
            selectedMembers={selectedMembers} // Asegúrate de pasar selectedMembers
            setSelectedMembers={setSelectedMembers} // Asegúrate de pasar setSelectedMembers
            onSendMessage={handleSendMessage} // Función para enviar mensaje
            onSelectMember={handleSelectMember} // Manejar selección
            onDeleteMembers={handleDeleteMembers} // Función para eliminar miembros
            isCreateMemberOpen={isAddModalOpen} // Estado para abrir/cerrar modal de creación de miembro
            onCreateMemberClose={() => setIsAddModalOpen(false)} // Función para cerrar modal de creación de miembro
            onSaveMember={handleAddMember} // Función para guardar miembro
            isDetailsModalOpen={isDetailsModalOpen} // Estado para abrir/cerrar modal de detalles
            onDetailsModalClose={() => setIsDetailsModalOpen(false)} // Función para cerrar modal de detalles
            isEditModalOpen={isEditModalOpen} // Estado para abrir/cerrar modal de edición
            onEditModalClose={() => setIsEditModalOpen(false)} // Función para cerrar modal de edición
          />

          <CreateMember
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddMember}
            existingMembers={members} // Pasar la lista de miembros existentes
          />

          <input
            type="text"
            name="ilv"
            value={ilv}
            onChange={handleInputChange}
            className={inputErrors.ilv ? "input-error" : ""}
          />
          {inputErrors.ilv && <div className="error-message">{inputErrors.ilv}</div>}

          <input
            type="text"
            name="lvl"
            value={lvl}
            onChange={handleInputChange}
            className={inputErrors.lvl ? "input-error" : ""}
          />
          {inputErrors.lvl && <div className="error-message">{inputErrors.lvl}</div>}
        </>
      )}

      <NotificationSystem notification={notification} />
      <ConfirmationDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={onDeleteConfirmed}
        onCancel={() => setIsConfirmDeleteOpen(false)}
        message="¿Estás seguro de que deseas eliminar estos miembros?"
      />
      <ConfirmationDialog
        isOpen={isConfirmEditOpen}
        onClose={() => setIsConfirmEditOpen(false)}
        onConfirm={onEditConfirmed}
        onCancel={() => setIsConfirmEditOpen(false)}
        message="¿Estás seguro de que deseas editar este miembro?"
      />
      <ConfirmationDialog
        isOpen={isConfirmDeleteSingleOpen}
        onClose={() => setIsConfirmDeleteSingleOpen(false)}
        onConfirm={onDeleteSingleConfirmed}
        onCancel={() => setIsConfirmDeleteSingleOpen(false)}
        message="¿Estás seguro de que deseas eliminar este miembro?"
      />

   
    </div>
  );
};

export default GuildMemberManagement;
