import React, { useState, useEffect } from 'react';

const MemberEditModal = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    username: '',
    level: 0,
    ilvl: 0,
    character_role: '',
    guild_role: '',
    main_archetype: '',
    secondary_archetype: '',
    grandmaster_profession_one: '',
    grandmaster_profession_two: '',
    email: '',
    notify_email: false,
  });

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <h2>{member ? 'Edit Member' : 'Create Member'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
        <input type="number" name="level" value={formData.level} onChange={handleInputChange} placeholder="Level" required />
        <input type="number" name="ilvl" value={formData.ilvl} onChange={handleInputChange} placeholder="Item Level" required />
        <input type="text" name="character_role" value={formData.character_role} onChange={handleInputChange} placeholder="Character Role" required />
        <input type="text" name="guild_role" value={formData.guild_role} onChange={handleInputChange} placeholder="Guild Role" required />
        <input type="text" name="main_archetype" value={formData.main_archetype} onChange={handleInputChange} placeholder="Main Archetype" required />
        <input type="text" name="secondary_archetype" value={formData.secondary_archetype} onChange={handleInputChange} placeholder="Secondary Archetype" required />
        <input type="text" name="grandmaster_profession_one" value={formData.grandmaster_profession_one} onChange={handleInputChange} placeholder="Grandmaster Profession One" required />
        <input type="text" name="grandmaster_profession_two" value={formData.grandmaster_profession_two} onChange={handleInputChange} placeholder="Grandmaster Profession Two" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
        <label>
          <input type="checkbox" name="notify_email" checked={formData.notify_email} onChange={handleCheckboxChange} />
          Notify Email
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default MemberEditModal;