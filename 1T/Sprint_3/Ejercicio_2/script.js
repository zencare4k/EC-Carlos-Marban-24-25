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

// Agregar evento al botón "Comparar"
document.getElementById('compareButton').addEventListener('click', () => {
    const pokemonName1 = document.getElementById('pokemonName1').value.toLowerCase();
    const pokemonName2 = document.getElementById('pokemonName2').value.toLowerCase();

    // Obtener datos de ambos Pokémon
    Promise.all([fetchPokemonData(pokemonName1), fetchPokemonData(pokemonName2)])
        .then(([pokemon1, pokemon2]) => comparePokemon(pokemon1, pokemon2))
        .catch(error => {
            document.getElementById('comparisonResult').innerHTML = `<p>${error.message}</p>`;
        });
});

// Función para obtener datos de un Pokémon de la PokeAPI
function fetchPokemonData(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon ${pokemonName} no encontrado`);
            }
            return response.json();
        });
}

// Función para comparar dos Pokémon y mostrar los resultados en una tabla
function comparePokemon(pokemon1, pokemon2) {
    const comparisonResult = document.getElementById('comparisonResult');

    // Crear una tabla para la comparación
    let tableHTML = `
        <table border="1">
            <tr>
                <th>Estadística</th>
                <th>${pokemon1.name}</th>
                <th>${pokemon2.name}</th>
                <th>Mejor</th>
            </tr>`;

    // Comparar cada estadística base
    const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    stats.forEach(stat => {
        const stat1 = pokemon1.stats.find(s => s.stat.name === stat).base_stat;
        const stat2 = pokemon2.stats.find(s => s.stat.name === stat).base_stat;

        let better = 'Empate';
        if (stat1 > stat2) better = pokemon1.name;
        else if (stat2 > stat1) better = pokemon2.name;

        tableHTML += `
            <tr>
                <td>${stat.charAt(0).toUpperCase() + stat.slice(1)}</td>
                <td>${stat1}</td>
                <td>${stat2}</td>
                <td>${better}</td>
            </tr>`;
    });

    tableHTML += `</table>`;
    comparisonResult.innerHTML = tableHTML;
}
// Obtener la cadena de evolución completa
function fetchEvolutionChain(pokemonName) {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => fetch(speciesData.evolution_chain.url))
        .then(response => response.json())
        .then(evolutionData => displayEvolutionChain(evolutionData.chain))
        .catch(error => {
            document.getElementById('evolutionChain').innerHTML = `<p>${error.message}</p>`;
        });
}

// Evento para iniciar la búsqueda de la cadena evolutiva
document.getElementById('evolutionSearchButton').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemonEvolutionName').value.toLowerCase();
    obtenerCadenaEvolutiva(pokemonName);
});

function obtenerCadenaEvolutiva(pokemon) {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            if (!speciesData.evolution_chain) {
                throw new Error(`El Pokémon ${pokemon} no tiene cadena evolutiva.`);
            }
            return fetch(speciesData.evolution_chain.url);
        })
        .then(response => response.json())
        .then(evolutionData => mostrarCadenaEvolutiva(evolutionData.chain))
        .catch(error => {
            document.getElementById('evolutionChainContainer').innerHTML = `<p>${error.message}</p>`;
        });
}

// Mostrar la cadena de evolución junto con imágenes y habilidades
function mostrarCadenaEvolutiva(chain) {
    const evolutionContainer = document.getElementById('evolutionChainContainer');
    evolutionContainer.innerHTML = ''; // Limpiar contenido previo

    let currentEvolution = chain;
    while (currentEvolution) {
        const pokemonName = currentEvolution.species.name;

        // Obtener los datos del Pokémon actual (imagen y habilidades)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(pokemonData => {
                const abilities = pokemonData.abilities.map(a => a.ability.name);
                const imageUrl = pokemonData.sprites.front_default;

                // Crear un elemento para mostrar el Pokémon, imagen y habilidades
                const evolutionHTML = `
                    <div style="display: inline-block; text-align: center; margin: 10px;">
                        <img src="${imageUrl}" alt="${pokemonName}" width="100">
                        <h4>${pokemonData.name}</h4>
                        <p>Habilidades: ${abilities.map(a => `<button onclick="mostrarDetalleHabilidad('${a}')">${a}</button>`).join(', ')}</p>
                    </div>
                `;
                evolutionContainer.innerHTML += evolutionHTML;
            });
        
        currentEvolution = currentEvolution.evolves_to[0]; // Pasar a la siguiente evolución en la cadena
    }
}

// Función para mostrar detalles de habilidad en un modal
function mostrarDetalleHabilidad(abilityName) {
    const abilityUrl = `https://pokeapi.co/api/v2/ability/${abilityName}`;

    fetch(abilityUrl)
        .then(response => response.json())
        .then(data => {
            const effect = data.effect_entries.find(e => e.language.name === 'en').effect;
            const modal = document.getElementById('abilityModal');
            const abilityDetails = document.getElementById('abilityDetails');
            
            abilityDetails.innerHTML = `<h4>${data.name}</h4><p>${effect}</p>`;
            modal.style.display = 'block';
        });
}

// Cerrar el modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('abilityModal').style.display = 'none';
};

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('abilityModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
