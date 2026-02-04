
// IMPORT LOGIC


async function getProducts() {
    const response = await fetch('./data.json');
    return await response.json();
}

const products = await  getProducts();
console.log(products);

products.forEach(product => {
    console.log(product.id);
})


// BUTTON COUNTER LOGIC


// VARIABLES

const cartItens = [];

const buttonDecrement = document.querySelector(".button-counter-decrement");
const buttonIncrement = document.querySelector(".button-counter-increment");
const productQuantity = document.querySelector(".button-counter");
const productCard = document.querySelectorAll(".product-card");

// EVENT LISTENERS


productCard.forEach( card => { 

    card.addEventListener("click", (event) => {
        
        
        
        const currentProduct = event.target
        if(currentProduct.classList.contains("product-button")) {
            
            cartItens.push({
            id: card.dataset.id,
            quantity: 1 
            });
            console.log(cartItens);


            console.log(currentProduct);
            
            const buttonAddToCart = card.querySelector(".button-addCart");
            buttonAddToCart.classList.add("active-state");

            const productButtons = card.querySelector(".product-button");
            productButtons.classList.add("deactive-state");

            updateCart();
            
        }
         

    })

})


// productButtons.forEach( productButton => {

//     productButton.addEventListener("click", () => {
   
//     
// })


// })






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
const cartList = document.querySelector(".cart-list");



const cartItemTemplate = document.querySelector("#cart-item-template");






function updateCart() {

    cartEmptyImage.classList.add("deactive-state");
    cartEmptyMessage.classList.add("deactive-state");
    cartList.classList.add("cart-active-state");

    cartList.replaceChildren()

    cartItens.forEach(item => {

        const cartItem = cartItemTemplate.content.cloneNode(true);
        const cartItemName = cartItem.querySelector(".cart-item-name");
        const cartItemQuantity = cartItem.querySelector(".cart-item-quantity");
        const cartItemPrice = cartItem.querySelector(".cart-item-price");
        
        
        
        const productData = products.find(product => product.id == item.id);
        cartItemName.textContent = productData.name;
        cartItemPrice.textContent = `$ ${productData.price}`
        cartItemQuantity.textContent = item.quantity
        

        
        cartList.prepend(cartItem);
        


    })



}
