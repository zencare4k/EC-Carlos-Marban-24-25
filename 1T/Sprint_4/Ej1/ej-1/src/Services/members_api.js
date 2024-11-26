// members_api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getAllMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/guildmembers`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

export const updateMember = async (userId, memberData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteMember = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/guildmembers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

export const getMemberById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching member details:', error);
    throw error;
  }
};

export const updateMemberDKP1 = async (userId, value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP1`, { value });
    return response.data;
  } catch (error) {
    console.error('Error updating DKP1:', error);
    throw error;
  }
};

export const updateMemberDKP2 = async (userId, value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP2`, { value });
    return response.data;
  } catch (error) {
    console.error('Error updating DKP2:', error);
    throw error;
  }
};

export const getMembersByLevelGreaterThan = async (level) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/level/greaterthan/${level}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members by level:', error);
    throw error;
  }
};

export const getMembersByIlvlGreaterThan = async (ilvl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/ilvl/greaterthan/${ilvl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members by ilvl:', error);
    throw error;
  }
};

export const getMembersByCharacterRole = async (characterRole) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/character_role/${characterRole}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members by character role:', error);
    throw error;
  }
};

export const getMemberNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guildmembers/${userId}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching member notifications:', error);
    throw error;
  }
};

export const updateMemberNotifications = async (userId, notifications) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/notifications`, notifications);
    return response.data;
  } catch (error) {
    console.error('Error updating member notifications:', error);
    throw error;
  }
};