export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }];
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const cartElement = document.querySelector(`.js-add-to-cart-${productId}`)
    cartElement.classList.add("js-add-to-cart-display")
    setTimeout(() => {
        cartElement.classList.remove("js-add-to-cart-display")
    }, 1500)

    let matchingitem;
    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingitem = item;
        }
    })
    const quantity = document.querySelector(`.js-quantity-selector-${productId}`)
    if (matchingitem) {
        matchingitem.quantity += Number(quantity.value);
    }
    else {
        cart.push({
            productId: productId,
            quantity: Number(quantity.value)
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const prodIndex = cart.findIndex(cartItem => cartItem.productId === productId);
    if (prodIndex != -1) {
        cart.splice(prodIndex, 1)
    }

    saveToStorage();
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
}