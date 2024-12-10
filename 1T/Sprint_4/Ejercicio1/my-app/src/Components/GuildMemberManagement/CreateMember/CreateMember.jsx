import React, { useState } from 'react';
import './CreateMember.css';

const CreateMember = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    username: '',
    level: '',
    ilvl: '',
    character_role: '',
    guild_role: '',
    main_archetype: '',
    secondary_archetype: '',
    grandmaster_profession_one: '',
    grandmaster_profession_two: '',
    email: '',
    notify_email: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.level || isNaN(formData.level) || formData.level <= 0) newErrors.level = 'Level must be a positive number';
    if (!formData.ilvl || isNaN(formData.ilvl) || formData.ilvl <= 0) newErrors.ilvl = 'ilvl must be a positive number';
    // Add more validations as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onCreate(formData);
      setFormData({
        username: '',
        level: '',
        ilvl: '',
        character_role: '',
        guild_role: '',
        main_archetype: '',
        secondary_archetype: '',
        grandmaster_profession_one: '',
        grandmaster_profession_two: '',
        email: '',
        notify_email: false
      });
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  return (
    <form className="create-member" onSubmit={handleSubmit}>
      {/* Implement form inputs */}
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      {errors.username && <span className="error">{errors.username}</span>}
      {/* Add more inputs as needed */}
      <button type="submit">Create Member</button>
    </form>
  );
};

export default CreateMember;