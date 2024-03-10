"use strict";

function createProductIncart(product) {
    cartDOM.insertAdjacentHTML('beforeend', `
            <div class="cart__item">
                <img class="cart__item__image" src="${product.image}" alt="${product.name}" />
                <h3 class="cart__item__name">${product.name}</h3>
                <h3 class="cart__item__price">${product.price}</h3>
                <button class="btn btn--primary btn--small ${(product.quantity === 1 ? 'btn--danger' : '')}" data-action="DECREASE_ITEM">&minus;</button>
                <h3 class="cart__item__quantity">${product.quantity}</h3>
                <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
                <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
            </div>
        `);
}

function increaseItem(cartItemDOM, product) {
    cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {

        cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
                localStorage.setItem('cart', JSON.stringify(cart));
            } // Endif
        }); // EndForeach
        updateTotalValue();
    }); // EndEvent
}

function decreaseItem(cartItemDOM, product, addToCartButtonDOM) {
    cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {
        cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                    cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    cartItemDOM.classList.add('cart__item--removed');
                    setTimeout(() => cartItemDOM.remove(), 250);
                    cart = cart.filter(cartItem => cartItem.name !== product.name);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    addToCartButtonDOM.innerText = "Adicionar ao Carrinho";
                    addToCartButtonDOM.disabled = false;
                } // Endif

                if (cartItem.quantity === 1) {
                    cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
                } // Endif
            } // Endif
            updateTotalValue();
        }); // EndForeach
    }); // EndEvent
}

function removeItem(cartItemDOM, product, addToCartButtonDOM) {
    cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => {
        cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartItemDOM.classList.add('cart__item--removed');
                setTimeout(() => cartItemDOM.remove(), 250);
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                addToCartButtonDOM.innerText = "Adicionar ao Carrinho";
                addToCartButtonDOM.disabled = false;
            } // Endif
            updateTotalValue();
        }); // EndForeach
    }); // EndEvent
}

function addCartItemsDOM(cartItemDOM, product, addToCartButtonDOM) {
    if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
        console.log("clique passou por aqui");
        increaseItem(cartItemDOM, product);

        decreaseItem(cartItemDOM, product, addToCartButtonDOM);

        removeItem(cartItemDOM, product, addToCartButtonDOM);
        updateTotalValue()
    } // Endif
}

function updateTotalValue() {
    const totalValueElement = document.getElementById('total');
    const totalValue = calculateTotalValue();
    totalValueElement.innerHTML = `Total do Pedido: R$ ${totalValue.toFixed(2)}`;
}

function calculateTotalValue() {
    let totalValue = 0;

    // Itera sobre os itens no carrinho e calcula o valor total
    cart.forEach(cartItem => {
        totalValue += parseFloat(cartItem.price) * cartItem.quantity;
    });

    return totalValue;
}