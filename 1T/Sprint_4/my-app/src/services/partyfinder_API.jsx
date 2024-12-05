import axios from 'axios';

const API_BASE_URL = ' http://localhost:3000';

const guildmembers_API = {

    createParty: async (partySize, partyData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/partyfinder/${partySize}`, partyData);
            return response.data;
        } catch (error) {
            console.error('Error creating party:', error);
            throw error;
        }
    },

    addMemberToParty: async (partySize, partyId, memberData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/partyfinder/${partySize}/${partyId}/addMember`, memberData);
            return response.data;
        } catch (error) {
            console.error('Error adding member to party:', error);
            throw error;
        }
    },

    removeMemberFromParty: async (partySize, partyId, memberData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/partyfinder/${partySize}/${partyId}/removeMember`, memberData);
            return response.data;
        } catch (error) {
            console.error('Error removing member from party:', error);
            throw error;
        }
    },

    getPartyDetails: async (partySize, partyId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/partyfinder/${partySize}/${partyId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching party details:', error);
            throw error;
        }
    },

    deleteParty: async (partySize, partyId, userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/partyfinder/${partySize}/${partyId}`, { data: { user_id: userId } });
            return response.data;
        } catch (error) {
            console.error('Error deleting party:', error);
            throw error;
        }
    },

    updatePartyMemberRole: async (partySize, partyId, memberData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/partyfinder/update-role/${partySize}/${partyId}`, memberData);
            return response.data;
        } catch (error) {
            console.error('Error updating party member role:', error);
            throw error;
        }
    }
};

export default guildmembers_API;