import React, { useState } from 'react';
import './MemberEditModal.css';

const MemberEditModal = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...member });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
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
      await onSave(formData);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <form className="member-edit-modal" onSubmit={handleSubmit}>
      <h2>Edit Member</h2>
      {/* Implement form inputs */}
      <input type="text" name="username" value={formData.username} onChange={handleChange} disabled />
      {errors.username && <span className="error">{errors.username}</span>}
      {/* Add more inputs as needed */}
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default MemberEditModal;