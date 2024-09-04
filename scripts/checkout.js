import { cart, removeFromCart, updateFromCart, saveToStorage, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderOrderSummary() {
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

    let deliveryOption;
    const deliveryOptionId = cartItem.deliveryOptionId;
    deliveryOptions.forEach((option) => {
      if (deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D')

    cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${deliveryOptionsHTML(productId, cartItem)}
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
        const inputElement = document.querySelector(`.js-input-quantity-${updbtn.dataset.productId}`)
        if (Number(inputElement.value) > 0) {
          inputElement.style.display = "none";
          updbtn.innerHTML = "Update";
          const quantityElement = document.querySelector(`.js-product-quantity-${updbtn.dataset.productId}`)
          quantityElement.innerText = inputElement.value
          quantityElement.style.display = "inline";

          const matchingCartItem = cart.find(cartItem => cartItem.productId == updbtn.dataset.productId)
          if (matchingCartItem) {
            matchingCartItem.quantity = inputElement.value
          }
          saveToStorage();
        }
        else {
          alert("Quantity can not be less than 1")
        }
      }
    })
  })

  function deliveryOptionsHTML(productId, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D')

      const priceString = deliveryOption.priceCents === 0 ? "Free" : `${formatCurrency(deliveryOption.priceCents)}`

      const isChecked = deliveryOption.id == cartItem.deliveryOptionId ? "checked" : ""
      html += `
      <div class="delivery-option">
        <input type="radio" ${isChecked} 
                class="delivery-option-input js-delivery-option"
                name="delivery-option-${productId}"
                data-product-id=${productId}
                data-delivery-option-id=${deliveryOption.id}>
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} - Shipping
            </div>
          </div>
      </div>
    `
    })
    return html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })
}

renderOrderSummary();