// Mock para os produtos - idealmente isso viria de uma API
const products = [
    {
        name: 'Dipirona Sódica',
        price: '4,99',
        image: 'img/products/dipirona-sodica.jpg',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
    {
        name: 'Desodorante Rexona',
        price: '12,99',
        image: 'img/products/desodorante-rexona.png',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
    {
        name: 'Fralda Huggies',
        price: '23,00',
        image: 'img/products/fralda.jpg',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
    {
        name: 'NAN Supreme 1',
        price: '102,99',
        image: 'img/products/nan-supreme.jpg',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
    {
        name: 'Benegripe',
        price: '32,79',
        image: 'img/products/benegripe.png',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
    {
        name: 'Xarope Expec',
        price: '30,69',
        image: 'img/products/xarope-expec.png',
        description: 'Lorem ipsum dolor sit amet. Ut temporibus dolorem qui voluptate libero sit deserunt esse. Aut voluptatem tempora vel galisum totam sed ratione libero eum nostrum maiores non dolor recusandae. Vel illum impedit non harum fugiat et adipisci minus 33 ipsum praesentium id odit sint ut aperiam similique! Hic iste earum sed voluptas itaque et omnis rerum ut mollitia iusto non quisquam obcaecati quo molestiae praesentium.',
    },
];

// Carregar os detalhes do produto com base no nome que foi passado via URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');

    const product = products.find(p => p.name === productName);
    if (product) {
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productPrice').innerText = `${product.price}`;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').innerText = product.description;
        
        // Adiciona ao carrinho
        document.getElementById('addToCartButton').addEventListener('click', () => {
            addToCart(product);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');

    const product = products.find(p => p.name === productName);
    if (product) {
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productPrice').innerText = `R$ ${product.price}`;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').innerText = product.description;
        
        // Adiciona ao carrinho
        document.getElementById('addToCartButton').addEventListener('click', () => {
            addToCart(product);
            updateCartUI();
        });

        // Atualiza o estado do botão de adicionar ao carrinho
        updateCartUI();
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.name === product.name);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} foi adicionado ao carrinho!`);
}

function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButton = document.getElementById('addToCartButton');
    
    if (cart.some(item => item.name === document.getElementById('productName').innerText)) {
        addToCartButton.innerText = "No Carrinho";
        addToCartButton.disabled = true;
    } else {
        addToCartButton.innerText = "Adicionar ao Carrinho";
        addToCartButton.disabled = false;
    }
}
