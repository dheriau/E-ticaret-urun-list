document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    let cart = [];

    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} TL</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Sepete Ekle</button>
                `;

                productList.appendChild(productDiv);
            });
        });

    window.addToCart = (id, name, price) => {
        cart.push({ id, name, price });
        updateCart();
    };

    function updateCart() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            const li = document.createElement("li");
            li.innerText = `${item.name} - ${item.price} TL`;
            cartItems.appendChild(li);
        });

        totalPrice.innerText = total.toFixed(2);
    }

    window.clearCart = () => {
        cart = [];
        updateCart();
    };
});
