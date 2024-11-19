import axios from 'axios';

const API_URL = 'http://localhost:3000/guildmembers';

const updateMember = async (userId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating member:', error);
        throw error;
    }
};

export default updateMember;