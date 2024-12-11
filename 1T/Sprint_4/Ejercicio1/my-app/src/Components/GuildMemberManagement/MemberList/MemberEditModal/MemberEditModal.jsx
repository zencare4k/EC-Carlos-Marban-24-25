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
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="member-edit-modal" onSubmit={handleSubmit}>
          <h2>Edit Member</h2>
          <input type="text" name="username" value={formData.username} onChange={handleChange} disabled />
          {errors.username && <span className="error">{errors.username}</span>}
          
          <input type="number" name="level" value={formData.level} onChange={handleChange} />
          {errors.level && <span className="error">{errors.level}</span>}
          
          <input type="number" name="ilvl" value={formData.ilvl} onChange={handleChange} />
          {errors.ilvl && <span className="error">{errors.ilvl}</span>}
          
          <select name="character_role" value={formData.character_role} onChange={handleChange}>
            <option value="TANK">TANK</option>
            <option value="HEALER">HEALER</option>
            <option value="DAMAGE">DAMAGE</option>
            <option value="SUPPORT">SUPPORT</option>
          </select>
          
          <select name="guild_role" value={formData.guild_role} onChange={handleChange}>
            <option value="LIDER">LIDER</option>
            <option value="GERENTE SENIOR">GERENTE SENIOR</option>
            <option value="GERENTE">GERENTE</option>
            <option value="GERENTE A2">GERENTE A2</option>
            <option value="ALPHA 2">ALPHA 2</option>
            <option value="MEMBER">MEMBER</option>
          </select>
          
          <select name="main_archetype" value={formData.main_archetype} onChange={handleChange}>
            <option value="BARD">BARD</option>
            <option value="CLERIC">CLERIC</option>
            <option value="FIGHTER">FIGHTER</option>
            <option value="MAGE">MAGE</option>
            <option value="RANGER">RANGER</option>
            <option value="ROGUE">ROGUE</option>
            <option value="SUMMONER">SUMMONER</option>
            <option value="TANK">TANK</option>
          </select>
          
          <select name="secondary_archetype" value={formData.secondary_archetype} onChange={handleChange}>
            <option value="BARD">BARD</option>
            <option value="CLERIC">CLERIC</option>
            <option value="FIGHTER">FIGHTER</option>
            <option value="MAGE">MAGE</option>
            <option value="RANGER">RANGER</option>
            <option value="ROGUE">ROGUE</option>
            <option value="SUMMONER">SUMMONER</option>
            <option value="TANK">TANK</option>
          </select>
          
          <select name="grandmaster_profession_one" value={formData.grandmaster_profession_one} onChange={handleChange}>
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
          
          <select name="grandmaster_profession_two" value={formData.grandmaster_profession_two} onChange={handleChange}>
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
          
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default MemberEditModal;