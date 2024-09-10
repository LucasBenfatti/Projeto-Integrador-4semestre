document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
});

function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderSummary = document.getElementById('orderSummary');
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.quantity}x ${item.name} - R$${item.price}`;
        orderSummary.appendChild(itemElement);
        totalPrice += item.quantity * parseFloat(item.price);
    });

    document.getElementById('totalPrice').textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

function completeOrder() {
    // Coletar dados do formulário
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cep = document.getElementById('cep').value;
    const number = document.getElementById('number').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!name || !address || !cep || !number || !paymentMethod) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Simular envio do pedido
    const order = {
        name,
        address,
        cep,
        number,
        paymentMethod,
        items: JSON.parse(localStorage.getItem('cart')) || [],
        total: document.getElementById('totalPrice').textContent
    };

    // Limpar o carrinho
    localStorage.removeItem('cart');

    alert("Pedido realizado com sucesso!");

    // Redirecionar para uma página de confirmação ou de agradecimento
    window.location.href = 'order-confirmation.html';
}
