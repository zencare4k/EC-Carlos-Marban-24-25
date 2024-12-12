import React, { useEffect, useState } from "react";
import { fetchMembers } from "./../../Services/guildmembers_API";
import './GuildMemberManagement.css' 
import FilterBar from "./FilterBar/FilterBar"; 
import SortControls from "./SortControls/SortControls";
import CreateMember from "./CreateMember/CreateMember"
import MemberList from "./MemberList/MemberList";
import NotificationSystem from "../General/NoitficationSystem/NotificationSystem";

const GuildMembersTable = () => {
    const [members, setMembers] = useState([]); // Datos originales
    const [filteredMembers, setFilteredMembers] = useState([]); // Datos filtrados
    const [filters, setFilters] = useState({}); // Estado de filtros
    const [sortConfig, setSortConfig] = useState({ key: "", order: "" }); // Configuración de orden
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);
  
    useEffect(() => {
      const getMembers = async () => {
        try {
          setLoading(true);
          const data = await fetchMembers();
          setMembers(data);
          setFilteredMembers(data); // Inicializar los datos filtrados con todos los miembros
        } catch (err) {
          setError("Error al cargar los miembros.");
        } finally {
          setLoading(false);
        }
      };
  
      getMembers();
    }, []);
  
    // Función para manejar el cambio de filtros
    const handleFilterChange = (name, value) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
  
    // Función para manejar el orden
    const handleSortChange = (key, order) => {
      setSortConfig({ key, order });
    };

    const handleAddMember = (newMember) => {
        setMembers((prevMembers) => [...prevMembers, newMember]);
        setNotification({ message: 'Miembro añadido con éxito', type: 'success' });
      };
  
    // Aplicar filtros
    useEffect(() => {
      let filtered = [...members];
  
      if (filters.username) {
        filtered = filtered.filter((member) =>
          member.username.toLowerCase().includes(filters.username.toLowerCase())
        );
      }
  
      if (filters.character_role) {
        filtered = filtered.filter(
          (member) => member.character_role === filters.character_role
        );
      }
  
      if (filters.guild_role) {
        filtered = filtered.filter(
          (member) => member.guild_role === filters.guild_role
        );
      }
  
      if (filters.main_archetype) {
        filtered = filtered.filter(
          (member) => member.main_archetype === filters.main_archetype
        );
      }
  
      if (filters.secondary_archetype) {
        filtered = filtered.filter(
          (member) => member.secondary_archetype === filters.secondary_archetype
        );
      }
  
      if (filters.grandmaster_profession_one) {
        filtered = filtered.filter(
          (member) =>
            member.grandmaster_profession_one === filters.grandmaster_profession_one
        );
      }
  
      if (filters.grandmaster_profession_two) {
        filtered = filtered.filter(
          (member) =>
            member.grandmaster_profession_two === filters.grandmaster_profession_two
        );
      }
  
      if (filters.min_level) {
        filtered = filtered.filter((member) => member.level >= filters.min_level);
      }
  
      if (filters.max_level) {
        filtered = filtered.filter((member) => member.level <= filters.max_level);
      }
  
      setFilteredMembers(filtered);
    }, [filters, members]);
  
    // Aplicar orden
    useEffect(() => {
      if (sortConfig.key && sortConfig.order) {
        const sorted = [...filteredMembers].sort((a, b) => {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];
  
          if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1;
          if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1;
          return 0;
        });
  
        setFilteredMembers(sorted);
      }
    }, [sortConfig, filteredMembers]);
  
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <h1>Guild Members</h1>
  
        {/* Filtros */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
  
        {/* Ordenar */}
        <SortControls onSortChange={handleSortChange} />
  
       
        <div>
      
      <button onClick={() => setIsModalOpen(true)}>Añadir Miembro</button>
      <CreateMember
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMemberAdded={handleAddMember}
      />
      {/* Aquí van FilterBar, SortBar y la tabla */}
    </div>

    <MemberList members={filteredMembers} />
    
         
          {notification && (
        <NotificationSystem
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
          
      </div>

      
    );
  };

export default GuildMembersTable;