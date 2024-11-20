const socket = io()

socket.on('updateProducts', (products) => {

    const parent = document.getElementById('products');


    parent.innerHTML = products.map((p) => { return `<div>${p.title} ${p.price}</div>` }).join(``);

})
