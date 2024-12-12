export const validateMember = (member) => {
    const errors = {};
    if (!member.username) errors.username = 'Username is required';
    if (!member.level || isNaN(member.level) || member.level <= 0) errors.level = 'Level must be a positive number';
    if (!member.ilvl || isNaN(member.ilvl) || member.ilvl <= 0) errors.ilvl = 'ilvl must be a positive number';
    // Add more validations as needed
    return errors;
  };
  
  export const validateTeamComposition = (team) => {
    const errors = [];
    const roles = { TANK: 0, HEALER: 0, DAMAGE: 0, SUPPORT: 0 };
    team.forEach(member => {
      if (roles[member.character_role] !== undefined) {
        roles[member.character_role]++;
      }
    });
    if (roles.TANK < 1) errors.push('At least one TANK is required');
    if (roles.HEALER < 1) errors.push('At least one HEALER is required');
    // Add more role validations as needed
    return errors;
  };