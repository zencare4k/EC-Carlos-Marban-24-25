import axios from 'axios';

const API_BASE_URL = ' http://localhost:3000';

const guildmembers_API = {
    getGuildMembers: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/guildmembers`);
            return response.data;
        } catch (error) {
            console.error('Error fetching guild members:', error);
            throw error;
        }
    },

    createGuildMember: async (memberData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/guildmembers`, memberData);
            return response.data;
        } catch (error) {
            console.error('Error creating guild member:', error);
            throw error;
        }
    },

    updateGuildMember: async (userId, memberData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}`, memberData);
            return response.data;
        } catch (error) {
            console.error('Error updating guild member:', error);
            throw error;
        }
    },

    deleteGuildMember: async (userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/guildmembers/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting guild member:', error);
            throw error;
        }
    },

    updateDKP1: async (userId, value) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP1`, { value });
            return response.data;
        } catch (error) {
            console.error('Error updating DKP1:', error);
            throw error;
        }
    },

    updateDKP2: async (userId, value) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/updateDKP2`, { value });
            return response.data;
        } catch (error) {
            console.error('Error updating DKP2:', error);
            throw error;
        }
    },

    getMembersByLevel: async (level) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/guildmembers/level/greaterthan/${level}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching members by level:', error);
            throw error;
        }
    },

    getMembersByIlvl: async (ilvl) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/guildmembers/ilvl/greaterthan/${ilvl}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching members by ilvl:', error);
            throw error;
        }
    },

    getMembersByRole: async (role) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/guildmembers/character_role/${role}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching members by role:', error);
            throw error;
        }
    },

    getNotificationFlags: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/guildmembers/${userId}/notifications`);
            return response.data;
        } catch (error) {
            console.error('Error fetching notification flags:', error);
            throw error;
        }
    },

    updateNotificationFlags: async (userId, flags) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/guildmembers/${userId}/notifications`, flags);
            return response.data;
        } catch (error) {
            console.error('Error updating notification flags:', error);
            throw error;
        }
    },
};

export default guildmembers_API;