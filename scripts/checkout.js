import { cart, removeFromCart, updateFromCart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  let productId = cartItem.productId
  let matchingitem;

  for (const product of products) {
    if (productId === product.id) {
      matchingitem = product;
      break;
    }
  }
  cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${productId}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingitem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingitem.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingitem.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-product-quantity-${productId}">${cartItem.quantity}</span>
                </span>
                <input type="number" min="1" class="input-quantity js-input-quantity-${productId}">
                <span class="update-quantity-link link-primary js-update-order" data-product-id="${productId}">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-order" data-product-id="${productId}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
})
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-order').forEach((delbtn) => {
  delbtn.addEventListener('click', () => {
    removeFromCart(delbtn.dataset.productId)
  })
})

document.querySelectorAll('.js-update-order').forEach((updbtn) => {
  updbtn.addEventListener('click', () => {
    if (updbtn.innerText.trim() === "Update") {
      updbtn.innerHTML = "Save";
      updateFromCart(updbtn.dataset.productId)
    }
    else {
      updbtn.innerHTML = "Update";
      const inputElement = document.querySelector(`.js-input-quantity-${updbtn.dataset.productId}`)
      inputElement.style.display = "none";
      const quantityElement = document.querySelector(`.js-product-quantity-${updbtn.dataset.productId}`)
      quantityElement.innerText = inputElement.value
      quantityElement.style.display = "inline";

      const matchingCartItem = cart.find(cartItem => cartItem.productId == updbtn.dataset.productId)
      if (matchingCartItem) {
        matchingCartItem.quantity = inputElement.value
      }
      saveToStorage();
    }
  })
})