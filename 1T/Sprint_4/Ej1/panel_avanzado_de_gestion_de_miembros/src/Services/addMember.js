import axios from 'axios';
const API_URL = 'http://localhost:3000/guildmembers';

export const addMember = async (memberData) => {
    try {
        const response = await axios.post(API_URL, memberData);
        return response.data;
    } catch (error) {
        console.error('Error adding member:', error);
        throw error;
    }
};

export default addMember