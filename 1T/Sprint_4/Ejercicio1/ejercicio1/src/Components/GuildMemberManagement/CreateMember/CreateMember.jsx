import React, { useState } from 'react';
import './CreateMember.css';
import { createGuildMember } from '../../../Services/guildmembers_API'; // Adjust the import path as needed
import { validateMember } from '../../General/ValidationSystem/ValidationSystem'; // Ajusta la ruta según sea necesario
import { Toast } from 'react-bootstrap';

const CreateMember = ({ isOpen, onClose, onSave, existingMembers }) => {
  const initialFormData = {
    user_id: '',
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = validateMember(formData, existingMembers);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (existingMembers.some(member => member.user_id === formData.user_id)) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
    try {
      await createGuildMember(formData); // Use createGuildMember here
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <form className="create-member" onSubmit={handleSubmit}>
              <input type="text" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} />
              {errors.user_id && <span className="error">{errors.user_id}</span>}
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              {errors.username && <span className="error">{errors.username}</span>}
              <input type="text" name="level" placeholder="Level" value={formData.level} onChange={handleChange} />
              {errors.level && <span className="error">{errors.level}</span>}
              <input type="text" name="ilvl" placeholder="ilvl" value={formData.ilvl} onChange={handleChange} />
              {errors.ilvl && <span className="error">{errors.ilvl}</span>}
              <select name="character_role" value={formData.character_role} onChange={handleChange}>
                <option value="">Select Character Role</option>
                <option value="TANK">TANK</option>
                <option value="HEALER">HEALER</option>
                <option value="DAMAGE">DAMAGE</option>
                <option value="SUPPORT">SUPPORT</option>
              </select>
              <select name="guild_role" value={formData.guild_role} onChange={handleChange}>
                <option value="">Select Guild Role</option>
                <option value="LIDER">LIDER</option>
                <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                <option value="GERENTE">GERENTE</option>
                <option value="GERENTE A2">GERENTE A2</option>
                <option value="ALPHA 2">ALPHA 2</option>
                <option value="MEMBER">MEMBER</option>
              </select>
              <select name="main_archetype" value={formData.main_archetype} onChange={handleChange}>
                <option value="">Select Main Archetype</option>
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
                <option value="">Select Secondary Archetype</option>
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
                <option value="">Select Grandmaster Profession One</option>
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
                <option value="">Select Grandmaster Profession Two</option>
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
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
              <label>
                <input type="checkbox" name="notify_email" checked={formData.notify_email} onChange={handleChange} />
                Notify by Email
              </label>
              <button type="submit">Save Member</button>
            </form>
          </div>
        </div>
      )}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>User ID already exists!</Toast.Body>
      </Toast>
    </div>
  );
};

export default CreateMember;
