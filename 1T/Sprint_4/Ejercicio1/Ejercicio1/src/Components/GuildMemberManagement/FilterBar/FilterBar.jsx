import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="username"
        placeholder="Buscar por username"
        value={filters.username || ""}
        onChange={handleChange}
      />
      <select
        name="character_role"
        value={filters.character_role || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un rol</option>
        <option value="TANK">Tank</option>
        <option value="HEALER">Healer</option>
        <option value="DAMAGE">Damage</option>
        <option value="SUPPORT">Support</option>
      </select>
      <select
        name="guild_role"
        value={filters.guild_role || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un rol de gremio</option>
        <option value="LIDER">Lider</option>
        <option value="GERENTE">Gerente</option>
        <option value="GERENTE SENIOR">Gerente Senior</option>
        <option value="GERENTE A2">Gerente A2</option>
        <option value="ALPHA 2">Alpha 2</option>
        <option value="MEMBER">Member</option>
      </select>
      <select
        name="main_archetype"
        value={filters.main_archetype || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un arquetipo principal</option>
        <option value="BARD">Bard</option>
        <option value="CLERIC">Cleric</option>
        <option value="FIGHTER">Fighter</option>
        <option value="MAGE">Mage</option>
        <option value="RANGER">Ranger</option>
        <option value="ROGUE">Rogue</option>
        <option value="SUMMONER">Summoner</option>
        <option value="TANK">Tank</option>
      </select>
      <select
        name="secondary_archetype"
        value={filters.secondary_archetype || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un arquetipo secundario</option>
        <option value="BARD">Bard</option>
        <option value="CLERIC">Cleric</option>
        <option value="FIGHTER">Fighter</option>
        <option value="MAGE">Mage</option>
        <option value="RANGER">Ranger</option>
        <option value="ROGUE">Rogue</option>
        <option value="SUMMONER">Summoner</option>
        <option value="TANK">Tank</option>
      </select>
      <select
        name="grandmaster_profession_one"
        value={filters.grandmaster_profession_one || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona una profesión maestra</option>
        <option value="FISHING">Fishing</option>
        <option value="HERBALISM">Herbalism</option>
        <option value="HUNTING">Hunting</option>
        <option value="LUMBERJACKING">Lumberjacking</option>
        <option value="MINING">Mining</option>
        <option value="ALCHEMY">Alchemy</option>
        <option value="ANIMALHUSBANDRY">Animal Husbandry</option>
        <option value="COOKING">Cooking</option>
        <option value="FARMING">Farming</option>
        <option value="LUMBERMILLING">Lumbermilling</option>
        <option value="METALWORKING">Metalworking</option>
        <option value="STONECUTTING">Stonecutting</option>
        <option value="TANNING">Tanning</option>
        <option value="WEAVING">Weaving</option>
        <option value="ARCANEENGINEERING">Arcane Engineering</option>
        <option value="ARMORSMITHING">Armorsmithing</option>
        <option value="CARPENTRY">Carpentry</option>
        <option value="JEWELCUTTING">Jewel Cutting</option>
        <option value="LEATHERWORKING">Leatherworking</option>
        <option value="SCRIBE">Scribe</option>
        <option value="TAILORING">Tailoring</option>
        <option value="WEAPONSMITHING">Weaponsmithing</option>
      </select>
      <select
        name="grandmaster_profession_two"
        value={filters.grandmaster_profession_two || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona una segunda profesión maestra</option>
        <option value="FISHING">Fishing</option>
        <option value="HERBALISM">Herbalism</option>
        <option value="HUNTING">Hunting</option>
        <option value="LUMBERJACKING">Lumberjacking</option>
        <option value="MINING">Mining</option>
        <option value="ALCHEMY">Alchemy</option>
        <option value="ANIMALHUSBANDRY">Animal Husbandry</option>
        <option value="COOKING">Cooking</option>
        <option value="FARMING">Farming</option>
        <option value="LUMBERMILLING">Lumbermilling</option>
        <option value="METALWORKING">Metalworking</option>
        <option value="STONECUTTING">Stonecutting</option>
        <option value="TANNING">Tanning</option>
        <option value="WEAVING">Weaving</option>
        <option value="ARCANEENGINEERING">Arcane Engineering</option>
        <option value="ARMORSMITHING">Armorsmithing</option>
        <option value="CARPENTRY">Carpentry</option>
        <option value="JEWELCUTTING">Jewel Cutting</option>
        <option value="LEATHERWORKING">Leatherworking</option>
        <option value="SCRIBE">Scribe</option>
        <option value="TAILORING">Tailoring</option>
        <option value="WEAPONSMITHING">Weaponsmithing</option>
      </select>
    </div>
  );
};

export default FilterBar;
