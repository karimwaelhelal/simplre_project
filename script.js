let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let users = JSON.parse(localStorage.getItem('users')) || [];

function checkLogin() {
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.style.display = 'block';
        return;
    }
    if (!password) {
        passwordError.style.display = 'block';
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('username', user.username);
        alert(`Welcome back, ${user.username}! You have successfully logged in.`);
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        window.location.href = 'index.html';
    } else {
        passwordError.textContent = 'Invalid email or password';
        passwordError.style.display = 'block';
    }
}

function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    usernameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    if (!username) {
        usernameError.style.display = 'block';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.style.display = 'block';
        return;
    }
    if (users.find(u => u.email === email)) {
        emailError.textContent = 'Email is already in use';
        emailError.style.display = 'block';
        return;
    }
    if (password.length < 6) {
        passwordError.style.display = 'block';
        return;
    }
    if (password !== confirmPassword) {
        confirmPasswordError.style.display = 'block';
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please log in.');
    window.location.href = 'login.html';
}

function logout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.removeItem('username');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}

function addToCart(itemName, price) {
    const item = { name: itemName, price: price };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`"${itemName}" has been added to your cart!`);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
}

function filterProducts() {
    const season = document.getElementById('season-filter').value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const cardSeason = card.getAttribute('data-season');
        if (season === 'all' || season === cardSeason) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '0';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price} EGP</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been received, and we will reply to ${email} soon.`);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please fill in all fields!');
    }
}