import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Reemplaza con la URL base de tu API

// Obtener todos los miembros
export const getAllGuildMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guild members:', error);
    throw error;
  }
};

// Alias for getAllGuildMembers
export const fetchMembers = getAllGuildMembers;

// Crear un nuevo miembro
export const createGuildMember = async (memberData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/guildmembers`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating guild member:', error);
    throw error;
  }
};

// Obtener detalles de un miembro
export const getGuildMemberDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guild member details:', error);
    throw error;
  }
};

// Actualizar un miembro
export const updateGuildMember = async (userId, memberData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error updating guild member:', error);
    throw error;
  }
};

// Eliminar un miembro
export const deleteGuildMember = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/guildmembers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting guild member:', error);
    throw error;
  }
};

// Actualizar DKP_1 de un miembro
export const updateDKP1 = async (userId, value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP1`, { value });
    return response.data;
  } catch (error) {
    console.error('Error updating DKP_1:', error);
    throw error;
  }
};

// Actualizar DKP_2 de un miembro
export const updateDKP2 = async (userId, value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP2`, { value });
    return response.data;
  } catch (error) {
    console.error('Error updating DKP_2:', error);
    throw error;
  }
};

// Obtener miembros con nivel mayor que X
export const getMembersWithLevelGreaterThan = async (level) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/level/greaterthan/${level}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members with level greater than:', error);
    throw error;
  }
};

// Obtener miembros con ilvl mayor que X
export const getMembersWithIlvlGreaterThan = async (ilvl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/ilvl/greaterthan/${ilvl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members with ilvl greater than:', error);
    throw error;
  }
};

// Obtener miembros por character_role
export const getMembersByCharacterRole = async (characterRole) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/character_role/${characterRole}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members by character role:', error);
    throw error;
  }
};

// Obtener flags de notificación de un miembro
export const getNotificationFlags = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/${userId}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification flags:', error);
    throw error;
  }
};

// Actualizar flags de notificación de un miembro
export const updateNotificationFlags = async (userId, flags) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/notifications`, flags);
    return response.data;
  } catch (error) {
    console.error('Error updating notification flags:', error);
    throw error;
  }
};