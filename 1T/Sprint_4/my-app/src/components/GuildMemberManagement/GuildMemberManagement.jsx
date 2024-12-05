import React, { useState, useEffect } from 'react';
import SortControls from './SortControls/SortControls';
import FilterBar from './FilterBar/FilterBar';
import CreateMember from './CreateMember/CreateMember';
import MemberList from './MemberList/MemberList';
import guildmembers_API from '../../services/guildmembers_API';

const GuildMemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
        setIsDetailsModalOpen(true);
    };

    const handleMemberEdit = (member) => {
        setSelectedMember(member);
        setIsEditModalOpen(true);
    };

    const handleMemberUpdate = async (updatedMember) => {
        try {
            const data = await guildmembers_API.updateGuildMember(updatedMember.id, updatedMember);
            setMembers(members.map(member => member.id === data.id ? data : member));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating guild member:', error);
        }
    };

    const handleMemberCreate = async (newMember) => {
        try {
            const data = await guildmembers_API.createGuildMember(newMember);
            setMembers([...members, data]);
        } catch (error) {
            console.error('Error creating guild member:', error);
        }
    };

    return (
        <div>
            <FilterBar />
            <SortControls />
            <CreateMember onCreate={handleMemberCreate} />
            <MemberList members={members} onSelect={handleMemberSelect} onEdit={handleMemberEdit} />
        </div>
    );
};

export default GuildMemberManagement;
