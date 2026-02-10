// IMPORT LOGIC

async function getProducts() {
  const response = await fetch("./data.json");
  return await response.json();
}

const products = await getProducts();
console.log(products);

products.forEach((product) => {
  console.log(product.id);
});

// VARIABLES

const cartItens = [];

const productCard = document.querySelectorAll(".product-card");

// EVENT LISTENERS

productCard.forEach((card) => {
  card.addEventListener("click", (event) => {
    const currentProduct = event.target;

    if (currentProduct.classList.contains("product-button")) {
      cartItens.push({
        id: card.dataset.id,
        quantity: 1,
      });
      console.log(cartItens);

      console.log(currentProduct);

      const buttonAddToCart = card.querySelector(".button-addCart");
      buttonAddToCart.classList.add("active-state");

      const productButtons = card.querySelector(".product-button");
      productButtons.classList.add("deactive-state");

      const buttonDecrement = card.querySelector(".button-counter-decrement");
      const buttonIncrement = card.querySelector(".button-counter-increment");
      const productQuantity = card.querySelector(".button-counter");

      buttonIncrement.addEventListener("click", () => {
        let quantity = parseInt(productQuantity.textContent);
        quantity += 1;
        productQuantity.textContent = quantity;

        const itemInCart = cartItens.find(
          (item) => item.id === card.dataset.id,
        );

        if (itemInCart) {
          itemInCart.quantity = quantity;
        }

        updateCart();
      });

      buttonDecrement.addEventListener("click", () => {
        let quantity = parseInt(productQuantity.textContent);
        if (quantity > 0) {
          quantity -= 1;
          productQuantity.textContent = quantity;
        }


        const itemInCart = cartItens.find(
          (item) => item.id === card.dataset.id,
        );

        if (itemInCart) {
          itemInCart.quantity = quantity;
        }

        updateCart();
      });

      updateCart();
    }
  });
});

// })

// })

// BUTTON ADD TO CART LOGIC

const cartContainer = document.querySelector(".cart-container");
const cartTitleQuantity = document.querySelector(".cart-title-quantity");
const cartEmptyImage = document.querySelector(".cart-empty-image");
const cartEmptyMessage = document.querySelector(".cart-empty-description");
const cartList = document.querySelector(".cart-list");
const cartItemTemplate = document.querySelector("#cart-item-template");
const carbonNeutralConteiner = document.querySelector(
  ".carbon-neutral-container",
);
const confirmOrderButton = document.querySelector(".confirm-order-button");
const cartTotalPriceElement = document.querySelector(".cart-total-price");
const cartCheckoutContainer = document.querySelector(".cart-checkout-container");



function updateCartTitleQuantity() {
  const totalItems = cartItens.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  cartTitleQuantity.textContent = totalItems;
}



function toggleCartTotalVisibility() {
  if (cartItens.length > 0) {
    cartCheckoutContainer.style.display = "block";
  } else {
    cartCheckoutContainer.style.display = "none";
  }
}



function updateCartTotalPrice() {
  const total = cartItens.reduce((acc, item) => {
    const product = products.find(
      (product) => product.id == item.id
    );

    return acc + product.price * item.quantity;
  }, 0);

  cartTotalPriceElement.textContent = `$ ${total.toFixed(2)}`;
}







function updateCart() {
  cartEmptyImage.classList.add("deactive-state");
  cartEmptyMessage.classList.add("deactive-state");
  cartList.classList.add("cart-active-state");
  carbonNeutralConteiner.classList.add("carbon-neutral-container-active-state");
  confirmOrderButton.classList.add("confirm-order-button-active-state");

  cartList.replaceChildren();

  cartItens.forEach((item) => {
    const cartItem = cartItemTemplate.content.cloneNode(true);
    const cartItemName = cartItem.querySelector(".cart-item-name");
    const cartItemQuantity = cartItem.querySelector(".cart-item-quantity");
    const cartItemPrice = cartItem.querySelector(".cart-item-price");
    const removeButton = cartItem.querySelector(".cart-item-remove-button");

    const productData = products.find((product) => product.id == item.id);
    cartItemName.textContent = productData.name;
    cartItemPrice.textContent = `$ ${productData.price}`;
    cartItemQuantity.textContent = item.quantity;

    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartList.prepend(cartItem);
  });

  // REMOVE FROM CART LOGIC

  function removeFromCart(id) {
    const index = cartItens.findIndex((item) => item.id === id);

    if (index !== -1) {
      cartItens.splice(index, 1);
    }

    toggleProductButtons(id);
    updateCart();
  }

  function toggleProductButtons(id) {
    const card = document.querySelector(`.product-card[data-id="${id}"]`);
    if (!card) return;

    const buttonAddToCart = card.querySelector(".button-addCart");
    const productButton = card.querySelector(".product-button");

    buttonAddToCart.classList.remove("active-state");
    productButton.classList.remove("deactive-state");
  }


  updateCartTotalPrice();
  updateCartTitleQuantity();
  toggleCartTotalVisibility();
  
}

// BUTTON COUNTER LOGIC
