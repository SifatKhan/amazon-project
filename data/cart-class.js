class Cart {

    cartItem;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!this.cartItem) {
            this.cartItem = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem))
    }

    addToCart(productId) {
        const cartElement = document.querySelector(`.js-add-to-cart-${productId}`)
        cartElement.classList.add("js-add-to-cart-display")
        setTimeout(() => {
            cartElement.classList.remove("js-add-to-cart-display")
        }, 1500)

        let matchingitem;
        this.cartItem.forEach((item) => {
            if (item.productId === productId) {
                matchingitem = item;
            }
        })
        const quantity = document.querySelector(`.js-quantity-selector-${productId}`)
        if (matchingitem) {
            matchingitem.quantity += Number(quantity.value);
        }
        else {
            this.cartItem.push({
                productId: productId,
                quantity: Number(quantity.value),
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const prodIndex = this.cartItem.findIndex(cartItem1 => cartItem1.productId === productId);
        if (prodIndex != -1) {
            this.cartItem.splice(prodIndex, 1)
        }
        this.saveToStorage();
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    }

    updateFromCart(productId) {
        const quantityElement = document.querySelector(`.js-product-quantity-${productId}`)
        quantityElement.style.display = "none";

        const inputElement = document.querySelector(`.js-input-quantity-${productId}`)
        inputElement.style.display = "inline";
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingitem;
        this.cartItem.forEach((item) => {
            if (item.productId === productId) {
                matchingitem = item;
            }
        })
        matchingitem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}


const cart = new Cart('cart-oop')
const bussinessCart = new Cart('cart-bussiness')

console.log(cart)
console.log(bussinessCart)