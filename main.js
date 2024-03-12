"use strict";

// Objeto do storage que armazena o produto
let cart = (JSON.parse(localStorage.getItem('cart')) || []);
// Mapea nó de carrinho para criar nós internos no carregamento
const cartDOM = document.querySelector(".cart");
// Mapea todos os botoes de add ao carrinho para ações de click
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
const checkoutButton = document.getElementById('checkoutButton');

// Quando carrinho possui produto
if (cart.length > 0) {
    console.log(`Carrinho com ${cart.length} itens`)
    cart.forEach(cartItem => {
        const product = cartItem;
        console.log(`Percorrendo para apresentar o produto ${product} no carrinho`)
        createProductIncart(product)

        addToCartButtonsDOM.forEach(addToCartButtonDOM => {
            const productDOM = addToCartButtonDOM.parentNode;
            if (productDOM.querySelector(".product__name").innerText === product.name) {
                addToCartButtonDOM.innerText = "No carrinho";
                addToCartButtonDOM.disabled = true;

                const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
                cartItemsDOM.forEach(cartItemDOM => {
                    addCartItemsDOM(cartItemDOM, product, addToCartButtonDOM);
                }); // EndForeach
            } // Endif
        }); // EndForeach
    }); // EndForeach
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    console.log(`Percorrendo todos os botoes de add ao carrinho pelo DOM`)
    addToCartButtonDOM.addEventListener('click', () => {

        const productDOM = addToCartButtonDOM.parentNode;
        console.log(`Click de add ao carrinho capturado ${productDOM}`)
        const product = {
            image: productDOM.querySelector(".product__image").getAttribute("src"),
            name: productDOM.querySelector(".product__name").innerText,
            price: productDOM.querySelector(".product__price").innerText,
            quantity: 1
        };

        // Verifica se o produto ja existe no carrinho
        const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

        if (!isInCart) {
            console.log(`Inserindo produto ao carrinho ${product}`)
            createProductIncart(product)

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            addToCartButtonDOM.innerText = "No Carrinho";
            addToCartButtonDOM.disabled = true;

            // Uma vez add primeiro produto é mapeado o dom de todos os produtos do carrinho
            const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
            cartItemsDOM.forEach(cartItemDOM => {
                addCartItemsDOM(cartItemDOM, product, addToCartButtonDOM);
            }); // EndForeach
        } // Endif
    }); // EndEvent
}); // EndForeach

function finalizeOrder() {
    if (cart.length > 0) {
        const orderNumber = generateOrderNumber();
        alert(`Pedido finalizado! Número de rastreio do pedido: ${orderNumber} \n\n ATENÇÃO: Com este número, você consegue acompanhar a entrega 
        em tempo real no site dos correios.`);

        // Limpa o carrinho
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Remove os itens do DOM
        const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
        cartItemsDOM.forEach(cartItemDOM => {
            cartItemDOM.remove();
        });

        // Habilita os botões "Adicionar ao Carrinho"
        addToCartButtonsDOM.forEach(addToCartButtonDOM => {
            addToCartButtonDOM.innerText = "Adicionar ao Carrinho";
            addToCartButtonDOM.disabled = false;
        });


    } else {
        alert('Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.');
    }
}

function generateOrderNumber() {
    // Gere um número de pedido único com base na data e hora atual
    const date = new Date();
    const orderNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    return orderNumber;
}

function openCheckoutModal() {
    if (cart.length > 0) {
        const modal = document.getElementById('checkoutModal');
        const totalValue = calculateTotalValue();
        const totalParagraph = modal.querySelector('#total');
        totalParagraph.innerText = `Total do Pedido: R$ ${totalValue.toFixed(2)}`;
        modal.style.display = 'block';
    } else {
        alert('Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.');
    }
}

// Função para ocultar o modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
}


