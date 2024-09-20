import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import "../data/cart-class.js"
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';

async function loadPage() {
    try {
        await loadProductsFetch();
    }
    catch (error) {
        console.log("Error: ", error)
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/* Promise and Fetch */
// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })

/* Promise */
// new Promise((resolve) => {
//     throw "It's like a raise error in python";
//     loadProductsFetch(() => {
//         reject(); // create an error in the future
//         resolve();
//     })
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })

/* callback */
// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })
