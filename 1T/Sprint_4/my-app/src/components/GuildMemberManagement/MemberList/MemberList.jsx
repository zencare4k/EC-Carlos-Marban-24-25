import React, { useEffect, useState } from 'react';
import guildmembers_API from '../../../services/guildmembers_API';
import Pagination from './Pagination/Pagination';
import './MemberList.css'; // Importa el archivo CSS

const MemberList = ({ onSelect, onEdit }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await guildmembers_API.getGuildMembers();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching guild members:', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>user_id</th>
                        <th>username</th>
                        <th>level</th>
                        <th>ilvl</th>
                        <th>character_role</th>
                        <th>guild_role</th>
                        <th>main_archetype</th>
                        <th>secondary_archetype</th>
                        <th>grandmaster_profession_one</th>
                        <th>grandmaster_profession_two</th>
                        <th>Select</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.user_id}>
                            <td>{member.user_id}</td>
                            <td>{member.username}</td>
                            <td>{member.level}</td>
                            <td>{member.ilvl}</td>
                            <td>{member.character_role}</td>
                            <td>{member.guild_role}</td>
                            <td>{member.main_archetype}</td>
                            <td>{member.secondary_archetype}</td>
                            <td>{member.grandmaster_profession_one}</td>
                            <td>{member.grandmaster_profession_two}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    onChange={() => onSelect(member.user_id)} 
                                />
                            </td>
                            <td>
                                <button onClick={() => onEdit(member.user_id)}>Edit</button>
                                <button onClick={() => guildmembers_API.deleteGuildMember(member.user_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default MemberList;