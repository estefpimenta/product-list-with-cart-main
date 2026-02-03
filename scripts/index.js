
// IMPORT LOGIC
// import data from "../data.json" assert { type: "json" };


// console.log(data)


// BUTTON COUNTER LOGIC


// VARIABLES

const productButton = document.querySelector(".product-button");
const buttonAddToCart = document.querySelector(".button-addCart");
const buttonDecrement = document.querySelector(".button-counter-decrement");
const buttonIncrement = document.querySelector(".button-counter-increment");
const productQuantity = document.querySelector(".button-counter");

// EVENT LISTENERS

productButton.addEventListener("click", () => {
   
    buttonAddToCart.classList.add("active-state");
    productButton.classList.add("deactive-state");
})


buttonIncrement.addEventListener("click", () => {

    let quantity = parseInt(productQuantity.textContent);
    quantity += 1;
    productQuantity.textContent = quantity;

})


buttonDecrement.addEventListener("click", () => {

    let quantity = parseInt(productQuantity.textContent);
    if (quantity > 0) {
        quantity -= 1;
        productQuantity.textContent = quantity;
    }
})


// BUTTON ADD TO CART LOGIC

const cartContainer = document.querySelector(".cart-container");
const cartTitleQuantity = document.querySelector(".cart-title-quantity");
const cartEmptyImage = document.querySelector(".cart-empty-image");
const cartEmptyMessage = document.querySelector(".cart-empty-description");




productButton.addEventListener("click", () => {

    cartEmptyImage.classList.add("deactive-state");
    cartEmptyMessage.classList.add("deactive-state");
})
