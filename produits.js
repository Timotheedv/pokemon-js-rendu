

fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector(".product-list");

    data.results.forEach((pokemon) => {
      // Pokemons
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonDetails) => {
          const listItem = document.createElement("article");

          listItem.innerHTML = `
          <p>Type: ${pokemonDetails.types.map(type => type.type.name).join(", ")}</p>
            <h3>${pokemonDetails.name}</h3>
            <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
            <p>HP: ${pokemonDetails.stats[0].base_stat}</p>
            <p>Attaque: ${pokemonDetails.stats[1].base_stat}</p>
            <p>Défense: ${pokemonDetails.stats[2].base_stat}</p>

        `;

          
          const buyButton = document.createElement("button");
          buyButton.textContent = "Acheter";
          listItem.appendChild(buyButton);

          list.appendChild(listItem);
        });
    });
  });
