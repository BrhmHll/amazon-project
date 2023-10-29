import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from "../scripts/utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";


hello();


function renderCartSummary() {
    let cartSummaryHTML = '';
    cart.forEach(cartItem => {
        
        const productId = cartItem.productId;
        const product = products.find(p => p.id === productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = deliveryOptions.find(p => p.id === deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${product.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${product.name}
                        </div>
                        <div class="product-price">
                        $${formatCurrency(product.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id="${product.id}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                            ${deliveryOptionsHTML(product, cartItem)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    updateCartQuantity();
}

function deliveryOptionsHTML(product, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

        html += `<div class="delivery-option">
                    <input type="radio" ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${product.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>`;
    });

    return html;
}

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.every(p => cartQuantity += p.quantity);
    document.querySelector(".js-checkout-header-items-count-link").innerHTML = cartQuantity + " items";
}

renderCartSummary();

document.querySelectorAll(".js-delete-link").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        removeFromCart(productId);
        // renderCartSummary();
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    })
});