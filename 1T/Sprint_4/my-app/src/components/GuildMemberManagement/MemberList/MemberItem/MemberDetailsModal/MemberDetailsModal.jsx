import React, { useState } from 'react';
import Modal from 'react-modal';

const MemberDetailsModal = ({ member }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <span onClick={openModal} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                {member.name}
            </span>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Member Details"
            >
                <h2>{member.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>ser_id</td>
                            <td>{member.ser_id}</td>
                        </tr>
                        <tr>
                            <td>username</td>
                            <td>{member.username}</td>
                        </tr>
                        <tr>
                            <td>level</td>
                            <td>{member.level}</td>
                        </tr>
                        <tr>
                            <td>ilvl</td>
                            <td>{member.ilvl}</td>
                        </tr>
                        <tr>
                            <td>character_role</td>
                            <td>{member.character_role}</td>
                        </tr>
                        <tr>
                            <td>guild_role</td>
                            <td>{member.guild_role}</td>
                        </tr>
                        <tr>
                            <td>main_archetype</td>
                            <td>{member.main_archetype}</td>
                        </tr>
                        <tr>
                            <td>secondary_archetype</td>
                            <td>{member.secondary_archetype}</td>
                        </tr>
                        <tr>
                            <td>grandmaster_profession_one</td>
                            <td>{member.grandmaster_profession_one}</td>
                        </tr>
                        <tr>
                            <td>grandmaster_profession_two</td>
                            <td>{member.grandmaster_profession_two}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
};

export default MemberDetailsModal;