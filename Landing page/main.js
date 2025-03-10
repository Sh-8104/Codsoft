document.addEventListener('DOMContentLoaded', function() {
    const cart = document.getElementById('cart');
    const cartItems = document.querySelector('.cart-items');
    const totalSpan = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    let total = 0;

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const pizzaCard = this.closest('.pizza-card');
            const pizzaName = pizzaCard.querySelector('h3').textContent;
            const pizzaPrice = parseFloat(pizzaCard.dataset.price);
            
            addToCart(pizzaName, pizzaPrice);
        });
    });

    // Toggle cart visibility
    document.querySelector('.order-btn').addEventListener('click', function() {
        cart.classList.toggle('active');
    });

    function addToCart(name, price) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${name}</span>
            <span>₹${price.toFixed(2)}</span>
            <button class="remove-item">×</button>
        `;

        cartItems.appendChild(cartItem);
        total += price;
        updateTotal();

        // Remove item functionality
        cartItem.querySelector('.remove-item').addEventListener('click', function() {
            cartItem.remove();
            total -= price;
            updateTotal();
        });
    }

    function updateTotal() {
        totalSpan.textContent = total.toFixed(2);
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', function() {
        if (total > 0) {
            alert(`Thank you for your order! Total: ₹${total.toFixed(2)}`);
            cartItems.innerHTML = '';
            total = 0;
            updateTotal();
            cart.classList.remove('active');
        } else {
            alert('Your cart is empty!');
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Menu category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.textContent.toLowerCase();
            
            menuItems.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                } else if (category === 'classic pizzas' && item.dataset.category === 'classic') {
                    item.style.display = 'block';
                } else if (category === 'specialty pizzas' && item.dataset.category === 'specialty') {
                    item.style.display = 'block';
                } else if (category === 'pizza slices' && item.dataset.category === 'slice') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
