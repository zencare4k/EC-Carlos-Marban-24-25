import axios from 'axios';

const API_URL = 'http://localhost:3000/guildmembers';

export const deleteMember = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting member:', error);
        throw error;
    }
};

export default deleteMember;

