export const cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let productIndex = cart.findIndex(p => p.productId === productId);
    if (productIndex == -1) {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    } else {
        cart[productIndex].quantity++;
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    let productIndex = cart.findIndex(p => p.productId === productId);
    if (productIndex == -1) {
        console.log("Cart Item Not Found!");
    } else {
        cart.splice(productIndex, 1);
    }
    saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
    const cartItemIndex = cart.findIndex(p => p.productId === productId);
    const cartItem = cart[cartItemIndex];
    cartItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}