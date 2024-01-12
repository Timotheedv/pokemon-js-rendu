// Pokemons
fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector(".product-list");

    data.results.forEach((pokemon) => {
      // Pour chaque Pokémon, obtenir les détails supplémentaires
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonDetails) => {
          const listItem = document.createElement("article");

          // Générer un prix aléatoire entre 10 et 100
          const randomPrice = Math.floor(Math.random() * (100 - 10 + 1) + 10);

          listItem.innerHTML = `
                          <p>Type: ${pokemonDetails.types
                            .map((type) => type.type.name)
                            .join(", ")}</p>
                          <h3>${pokemonDetails.name}</h3>
                          <img src="${
                            pokemonDetails.sprites.front_default
                          }" alt="${pokemonDetails.name}">
                          <p>HP: ${pokemonDetails.stats[0].base_stat}</p>
                          <p>Attaque: ${pokemonDetails.stats[1].base_stat}</p>
                          <p>Défense: ${pokemonDetails.stats[2].base_stat}</p>  
                          <p>Prix: ${randomPrice}€</p>
                      `;

          const buyButton = document.createElement("button");
          buyButton.textContent = "Acheter";
          listItem.appendChild(buyButton);

          list.appendChild(listItem);
        });
    });
  });

//Barre recherche pokemon

document.querySelector("#searchInput").addEventListener("input", () => {
  const userInput = document.querySelector("#searchInput").value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Aucun Pokémon nommé "${userInput}" trouvé.`);
      }
      return response.json();
    })
    .then((data) => {
      const pokemonList = document.querySelector("#pokemonList");

      // Supprime tous les éléments de la liste
      while (pokemonList.firstChild) {
        pokemonList.removeChild(pokemonList.firstChild);
      }

      // Ajoute le Pokémon trouvé à la liste
      const listItem = document.createElement("article");
      listItem.innerHTML = `
      <p>Type: ${data.types.map((type) => type.type.name).join(", ")}</p>
                <h3>${data.name}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>HP: ${data.stats[0].base_stat}</p>
                <p>Attaque: ${data.stats[1].base_stat}</p>
                <p>Défense: ${data.stats[2].base_stat}</p>
                <p>Attaque Spéciale: ${data.stats[3].base_stat}</p>
                <p>Défense Spéciale: ${
                  data.stats[4].base_stat
                }</p>                
            `;
            const buyButton = document.createElement("button");
            buyButton.textContent = "Acheter";
            listItem.appendChild(buyButton);
      pokemonList.appendChild(listItem);
    })
    .catch((error) => {
      const pokemonList = document.querySelector("#pokemonList");
      pokemonList.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
});



// Fonction pour ajouter au panier
const addToCart = (pokemonDetails) => {
    const cartItem = {
      name: pokemonDetails.name,
      type: pokemonDetails.types.map((type) => type.type.name).join(", "),
      hp: pokemonDetails.stats[0].base_stat,
      attack: pokemonDetails.stats[1].base_stat,
      defense: pokemonDetails.stats[2].base_stat,
      price: Math.floor(Math.random() * (100 - 10 + 1) + 10), // Générer un prix aléatoire entre 10 et 100
      image: pokemonDetails.sprites.front_default,
    };
  
    // Récupérer le panier actuel du stockage local
    const currentCart = JSON.parse(localStorage.getItem("pokeMarketCart")) || [];
  
    // Ajouter le nouvel article au panier
    currentCart.push(cartItem);
  
    // Mettre à jour le stockage local avec le nouveau panier
    localStorage.setItem("pokeMarketCart", JSON.stringify(currentCart));
  
    // Ajouter ici une logique pour indiquer à l'utilisateur que le Pokémon a été ajouté au panier, si nécessaire
  };
  
 
  