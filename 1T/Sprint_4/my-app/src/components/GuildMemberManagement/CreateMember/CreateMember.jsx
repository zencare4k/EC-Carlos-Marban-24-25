import React, { useState, useEffect } from 'react';
import guildmembers_API from '../../../services/guildmembers_API';
import './CreateMember.css';

const CreateMember = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        user_id: '',
        username: '',
        level: '',
        ilvl: '',
        character_role: 'TANK',
        guild_role: 'MEMBER',
        main_archetype: 'BARD',
        secondary_archetype: 'BARD',
        grandmaster_profession_one: 'FISHING',
        grandmaster_profession_two: 'FISHING'
    });
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            const { name, email } = formData;
            if (!name || !email) {
                setError('All fields are required.');
                return;
            }
            if (!validateEmail(email)) {
                setError('Invalid email format.');
                return;
            }
            setError('');
            try {
                const response = await guildmembers_API.createGuildMember(formData);
                console.log('Guild member created:', response);
                setFormData({
                    name: '',
                    email: '',
                    user_id: '',
                    username: '',
                    level: '',
                    ilvl: '',
                    character_role: 'TANK',
                    guild_role: 'MEMBER',
                    main_archetype: 'BARD',
                    secondary_archetype: 'BARD',
                    grandmaster_profession_one: 'FISHING',
                    grandmaster_profession_two: 'FISHING'
                });
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error creating guild member:', error);
                setError('Error creating guild member.');
            }
        };
    

    useEffect(() => {
        if (!isModalOpen) {
            setFormData({
                name: '',
                email: '',
                user_id: '',
                username: '',
                level: '',
                ilvl: '',
                character_role: 'TANK',
                guild_role: 'MEMBER',
                main_archetype: 'BARD',
                secondary_archetype: 'BARD',
                grandmaster_profession_one: 'FISHING',
                grandmaster_profession_two: 'FISHING'
            });
            setError('');
        }
    }, [isModalOpen]);
        return (
            <div>
                <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h2>Create Member</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>User ID:</label>
                                    <input
                                        type="number"
                                        name="user_id"
                                        value={formData.user_id}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Level:</label>
                                    <input
                                        type="number"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Item Level (ilvl):</label>
                                    <input
                                        type="number"
                                        name="ilvl"
                                        value={formData.ilvl}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Character Role:</label>
                                    <select
                                        name="character_role"
                                        value={formData.character_role}
                                        onChange={handleChange}
                                    >
                                        <option value="TANK">TANK</option>
                                        <option value="HEALER">HEALER</option>
                                        <option value="DAMAGE">DAMAGE</option>
                                        <option value="SUPPORT">SUPPORT</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Guild Role:</label>
                                    <select
                                        name="guild_role"
                                        value={formData.guild_role}
                                        onChange={handleChange}
                                    >
                                        <option value="LIDER">LIDER</option>
                                        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                                        <option value="GERENTE">GERENTE</option>
                                        <option value="GERENTE A2">GERENTE A2</option>
                                        <option value="ALPHA 2">ALPHA 2</option>
                                        <option value="MEMBER">MEMBER</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Main Archetype:</label>
                                    <select
                                        name="main_archetype"
                                        value={formData.main_archetype}
                                        onChange={handleChange}
                                    >
                                        <option value="BARD">BARD</option>
                                        <option value="CLERIC">CLERIC</option>
                                        <option value="FIGHTER">FIGHTER</option>
                                        <option value="MAGE">MAGE</option>
                                        <option value="RANGER">RANGER</option>
                                        <option value="ROGUE">ROGUE</option>
                                        <option value="SUMMONER">SUMMONER</option>
                                        <option value="TANK">TANK</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Secondary Archetype:</label>
                                    <select
                                        name="secondary_archetype"
                                        value={formData.secondary_archetype}
                                        onChange={handleChange}
                                    >
                                        <option value="BARD">BARD</option>
                                        <option value="CLERIC">CLERIC</option>
                                        <option value="FIGHTER">FIGHTER</option>
                                        <option value="MAGE">MAGE</option>
                                        <option value="RANGER">RANGER</option>
                                        <option value="ROGUE">ROGUE</option>
                                        <option value="SUMMONER">SUMMONER</option>
                                        <option value="TANK">TANK</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Grandmaster Profession One:</label>
                                    <select
                                        name="grandmaster_profession_one"
                                        value={formData.grandmaster_profession_one}
                                        onChange={handleChange}
                                    >
                                        <option value="FISHING">FISHING</option>
                                        <option value="HERBALISM">HERBALISM</option>
                                        <option value="HUNTING">HUNTING</option>
                                        <option value="LUMBERJACKING">LUMBERJACKING</option>
                                        <option value="MINING">MINING</option>
                                        <option value="ALCHEMY">ALCHEMY</option>
                                        <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                                        <option value="COOKING">COOKING</option>
                                        <option value="FARMING">FARMING</option>
                                        <option value="LUMBERMILLING">LUMBERMILLING</option>
                                        <option value="METALWORKING">METALWORKING</option>
                                        <option value="STONECUTTING">STONECUTTING</option>
                                        <option value="TANNING">TANNING</option>
                                        <option value="WEAVING">WEAVING</option>
                                        <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                                        <option value="ARMORSMITHING">ARMORSMITHING</option>
                                        <option value="CARPENTRY">CARPENTRY</option>
                                        <option value="JEWELCUTTING">JEWELCUTTING</option>
                                        <option value="LEATHERWORKING">LEATHERWORKING</option>
                                        <option value="SCRIBE">SCRIBE</option>
                                        <option value="TAILORING">TAILORING</option>
                                        <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Grandmaster Profession Two:</label>
                                    <select
                                        name="grandmaster_profession_two"
                                        value={formData.grandmaster_profession_two}
                                        onChange={handleChange}
                                    >
                                        <option value="FISHING">FISHING</option>
                                        <option value="HERBALISM">HERBALISM</option>
                                        <option value="HUNTING">HUNTING</option>
                                        <option value="LUMBERJACKING">LUMBERJACKING</option>
                                        <option value="MINING">MINING</option>
                                        <option value="ALCHEMY">ALCHEMY</option>
                                        <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                                        <option value="COOKING">COOKING</option>
                                        <option value="FARMING">FARMING</option>
                                        <option value="LUMBERMILLING">LUMBERMILLING</option>
                                        <option value="METALWORKING">METALWORKING</option>
                                        <option value="STONECUTTING">STONECUTTING</option>
                                        <option value="TANNING">TANNING</option>
                                        <option value="WEAVING">WEAVING</option>
                                        <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                                        <option value="ARMORSMITHING">ARMORSMITHING</option>
                                        <option value="CARPENTRY">CARPENTRY</option>
                                        <option value="JEWELCUTTING">JEWELCUTTING</option>
                                        <option value="LEATHERWORKING">LEATHERWORKING</option>
                                        <option value="SCRIBE">SCRIBE</option>
                                        <option value="TAILORING">TAILORING</option>
                                        <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                                    </select>
                                </div>
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }


export default CreateMember;