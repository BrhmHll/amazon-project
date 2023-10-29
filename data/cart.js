export const cart = [];

export function addToCart(productId) {
    let productIndex = cart.findIndex(p => p.productId === productId);
    if (productIndex == -1) {
        cart.push({
            productId: productId,
            quantity: 1
        });
    } else {
        cart[productIndex].quantity++;
    }
}