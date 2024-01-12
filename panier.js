document.addEventListener('DOMContentLoaded', function () {
    const cartList = document.getElementById("cartList");
  
    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
      const currentCart = JSON.parse(localStorage.getItem("pokeMarketCart")) || [];
  
      cartList.innerHTML = "";
  
      currentCart.forEach((item, index) => {
        const listItem = document.createElement("article");
        listItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <p>Type: ${item.type}</p>
          <p>HP: ${item.hp}</p>
          <p>Attaque: ${item.attack}</p>
          <p>Défense: ${item.defense}</p>
          <p>Prix: ${item.price}€</p>
        `;
  
        const payButton = document.createElement("button");
        payButton.textContent = "Payer";
        payButton.addEventListener("click", function () {
          alert("Paiement effectué pour " + item.name);
          removeFromCart(index);
        });
        listItem.appendChild(payButton);
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Retirer";
        removeButton.addEventListener("click", function () {
          removeFromCart(index);
        });
        listItem.appendChild(removeButton);
  
        cartList.appendChild(listItem);
      });
    }
  
    // Fonction pour retirer du panier
    function removeFromCart(index) {
      const currentCart = JSON.parse(localStorage.getItem("pokeMarketCart")) || [];
      currentCart.splice(index, 1);
      localStorage.setItem("pokeMarketCart", JSON.stringify(currentCart));
      updateCartDisplay();
    }
  
    updateCartDisplay();
  });
  