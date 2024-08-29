document.addEventListener('DOMContentLoaded', () => {
    const updateBtns = document.querySelectorAll('.update-cart');

    updateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product');
            const action = btn.getAttribute('data-action');
            updateCart(productId, action);
        });
    });
});

function updateCart(productId, action) {
    let quantityChange = action === 'increase' ? 1 : -1;

    fetch('/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantityChange })
    })
    .then(response => response.json())
    .then(data => location.reload());
}
