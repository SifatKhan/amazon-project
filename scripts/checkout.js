import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import "../data/cart-class.js"
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

/* Promise */
// new Promise((resolve) => {
//     loadProductsFetch(() => {
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
