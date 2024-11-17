

document.getElementById('previousPage').addEventListener('click', (e) => {
    const url = e.target.getAttribute('data-url'); 
    if (url) {
        window.location.href = url; 
    }
});


document.getElementById('nextPage').addEventListener('click', (e) => {
    const url = e.target.getAttribute('data-url'); 
    if (url) {
        window.location.href = url; 
    }
});



document.addEventListener("DOMContentLoaded", async () => {
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {
        const response = await fetch(`/api/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const reponseTransformed = await response.json()
        const _cartId = reponseTransformed[0]._id
        cartId = _cartId
        localStorage.setItem('cartId', cartId)
    }
    const viewCartButton = document.getElementById('viewCart')
    viewCartButton.addEventListener('click',()=>{
        let cartId = localStorage.getItem('cartId')
        window.location.href = `${window.location.origin}/carts/${cartId}`;
    })
    
    const addToCartButtons = document.querySelectorAll('.button-add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            
            const productId = e.target.getAttribute('data-id');
            let cartId = localStorage.getItem('cartId')
            try {
                await addToCart(cartId, productId);
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        });
    });
});


async function addToCart(cartId, productId) {
    try {
        const cartId = localStorage.getItem('cartId')
        const response = await fetch(`/api/carts/${cartId}/products/${productId}?action=add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Product added to cart:', result);
            alert('Product added to cart!');
        } else {
            console.error('Failed to add product to cart:', response.status);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

