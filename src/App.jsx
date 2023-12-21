import React, { useState, useEffect } from 'react';
import './App.css';

const validTypes = [
  'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying',
  'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock',
  'Steel', 'Water',
];

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedWeakness, setSelectedWeakness] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
        );
        const data = await response.json();
        setPokemonList(data.pokemon);
        setFilteredPokemon(data.pokemon);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredPokemon(filtered);
  };

  const handleFilter = () => {
    let filtered = pokemonList;

    if (selectedType) {
      const lowercasedType = selectedType.toLowerCase();
      filtered = filtered.filter((p) =>
        p.type.map((t) => t.toLowerCase()).includes(lowercasedType)
      );
    }

    if (selectedWeakness) {
      const lowercasedWeakness = selectedWeakness.toLowerCase();
      filtered = filtered.filter((p) =>
        p.weaknesses.map((w) => w.toLowerCase()).includes(lowercasedWeakness)
      );
    }

    setFilteredPokemon(filtered);
  };

  const handleClearFilters = () => {
    setFilteredPokemon(pokemonList);
    setSearchTerm('');
    setSelectedType('');
    setSelectedWeakness('');
  };

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      {selectedPokemon ? (
        <div>
          <h1>Pokemon Details</h1>
          <button onClick={handleBackToList}>Back to List</button>
          {/* Render details here */}
        </div>
      ) : (
        <div className="container">
          <h1>Pokemon Index</h1>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <label>
            Type:
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select Type</option>
              {validTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Weakness:
            <input
              type="text"
              placeholder="Filter by weakness"
              value={selectedWeakness}
              onChange={(e) => setSelectedWeakness(e.target.value)}
            />
          </label>

          <button onClick={handleFilter}>Apply Filters</button>
          <button onClick={handleClearFilters}>Clear Filters</button>

          <ul>
            {filteredPokemon.map((p) => (
              <li key={p.id}>
                <a href="#" onClick={() => handlePokemonSelect(p)}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
