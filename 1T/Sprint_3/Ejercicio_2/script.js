// Agregar evento al botón "Buscar"
document.getElementById('searchButton').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    fetchPokemon(pokemonName);
});

// Función para hacer la solicitud a la PokeAPI
function fetchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Si el Pokémon no existe, lanzar un error
                throw new Error('Pokémon no encontrado');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => displayPokemon(data)) // Mostrar los datos del Pokémon
        .catch(error => {
            // Mostrar mensaje de error si no se encuentra el Pokémon
            document.getElementById('pokemonInfo').innerHTML = `<p>${error.message}</p>`;
        });
}

// Función para mostrar la información del Pokémon
function displayPokemon(data) {
    const pokemonInfo = document.getElementById('pokemonInfo');
    
    const name = data.name;
    const id = data.id;
    const types = data.types.map(type => type.type.name).join(', ');
    const imageUrl = data.sprites.front_default;

    // Mostrar los detalles del Pokémon en la página
    pokemonInfo.innerHTML = `
        <h2>${name} (ID: ${id})</h2>
        <p>Tipos: ${types}</p>
        <img src="${imageUrl}" alt="${name}">
    `;
}
