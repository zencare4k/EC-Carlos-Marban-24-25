import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { getGuildMemberDetails, updateGuildMember } from '../../../../Services/guildmembers_API';
import './MemberEditModal.css';
const MemberEditModal = ({ show, handleClose, userId }) => {
  const [memberData, setMemberData] = useState({
    username: '',
    level: 0,
    ilvl: 0,
    character_role: 'TANK',
    guild_role: 'MEMBER',
    main_archetype: 'BARD',
    secondary_archetype: 'BARD',
    grandmaster_profession_one: 'FISHING',
    grandmaster_profession_two: 'FISHING',
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (userId) {
      getGuildMemberDetails(userId).then(data => setMemberData(data));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGuildMember(userId, memberData);
      setShowToast(true);
      handleClose();
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={memberData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="number"
                name="level"
                value={memberData.level}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formIlvl">
              <Form.Label>Item Level (ilvl)</Form.Label>
              <Form.Control
                type="number"
                name="ilvl"
                value={memberData.ilvl}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCharacterRole">
              <Form.Label>Character Role</Form.Label>
              <Form.Control
                as="select"
                name="character_role"
                value={memberData.character_role}
                onChange={handleChange}
                required
              >
                <option>TANK</option>
                <option>HEALER</option>
                <option>DAMAGE</option>
                <option>SUPPORT</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGuildRole">
              <Form.Label>Guild Role</Form.Label>
              <Form.Control
                as="select"
                name="guild_role"
                value={memberData.guild_role}
                onChange={handleChange}
                required
              >
                <option>LIDER</option>
                <option>GERENTE SENIOR</option>
                <option>GERENTE</option>
                <option>GERENTE A2</option>
                <option>ALPHA 2</option>
                <option>MEMBER</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMainArchetype">
              <Form.Label>Main Archetype</Form.Label>
              <Form.Control
                as="select"
                name="main_archetype"
                value={memberData.main_archetype}
                onChange={handleChange}
                required
              >
                <option>BARD</option>
                <option>CLERIC</option>
                <option>FIGHTER</option>
                <option>MAGE</option>
                <option>RANGER</option>
                <option>ROGUE</option>
                <option>SUMMONER</option>
                <option>TANK</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSecondaryArchetype">
              <Form.Label>Secondary Archetype</Form.Label>
              <Form.Control
                as="select"
                name="secondary_archetype"
                value={memberData.secondary_archetype}
                onChange={handleChange}
                required
              >
                <option>BARD</option>
                <option>CLERIC</option>
                <option>FIGHTER</option>
                <option>MAGE</option>
                <option>RANGER</option>
                <option>ROGUE</option>
                <option>SUMMONER</option>
                <option>TANK</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGrandmasterProfessionOne">
              <Form.Label>Grandmaster Profession One</Form.Label>
              <Form.Control
                as="select"
                name="grandmaster_profession_one"
                value={memberData.grandmaster_profession_one}
                onChange={handleChange}
                required
              >
                <option>FISHING</option>
                <option>HERBALISM</option>
                <option>HUNTING</option>
                <option>LUMBERJACKING</option>
                <option>MINING</option>
                <option>ALCHEMY</option>
                <option>ANIMALHUSBANDRY</option>
                <option>COOKING</option>
                <option>FARMING</option>
                <option>LUMBERMILLING</option>
                <option>METALWORKING</option>
                <option>STONECUTTING</option>
                <option>TANNING</option>
                <option>WEAVING</option>
                <option>ARCANEENGINEERING</option>
                <option>ARMORSMITHING</option>
                <option>CARPENTRY</option>
                <option>JEWELCUTTING</option>
                <option>LEATHERWORKING</option>
                <option>SCRIBE</option>
                <option>TAILORING</option>
                <option>WEAPONSMITHING</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGrandmasterProfessionTwo">
              <Form.Label>Grandmaster Profession Two</Form.Label>
              <Form.Control
                as="select"
                name="grandmaster_profession_two"
                value={memberData.grandmaster_profession_two}
                onChange={handleChange}
                required
              >
                <option>FISHING</option>
                <option>HERBALISM</option>
                <option>HUNTING</option>
                <option>LUMBERJACKING</option>
                <option>MINING</option>
                <option>ALCHEMY</option>
                <option>ANIMALHUSBANDRY</option>
                <option>COOKING</option>
                <option>FARMING</option>
                <option>LUMBERMILLING</option>
                <option>METALWORKING</option>
                <option>STONECUTTING</option>
                <option>TANNING</option>
                <option>WEAVING</option>
                <option>ARCANEENGINEERING</option>
                <option>ARMORSMITHING</option>
                <option>CARPENTRY</option>
                <option>JEWELCUTTING</option>
                <option>LEATHERWORKING</option>
                <option>SCRIBE</option>
                <option>TAILORING</option>
                <option>WEAPONSMITHING</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
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
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Member updated successfully!</Toast.Body>
      </Toast>
    </>
  );
};

export default MemberEditModal;