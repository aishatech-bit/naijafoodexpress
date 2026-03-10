// Nigerian Food Database
const nigerianFoods = {
    featured: [
        {
            id: 1,
            name: "Jollof Rice with Chicken",
            image: "assets/jollof rice with chicken.jpeg",
            description: "The famous party jollof rice with grilled chicken, fried plantains and coleslaw",
            price: 3500,
            oldPrice: 4000,
            category: "rice",
            tag: "🔥 Party Special"
        },
        {
            id: 2,
            name: "Pepper Soup with Goat Meat",
            image: "assets/pepper  soup and goat meat.webp",
            description: "Spicy pepper soup with soft goat meat and uziza leaves",
            price: 2800,
            oldPrice: 3200,
            category: "soup",
            tag: "🌶️ Extra Spicy"
        },
        {
            id: 3,
            name: "Suya Platter",
            image: "assets/Suya Platter.jpeg",
            description: "Grilled spicy beef suya with onions, tomatoes and special yaji spice",
            price: 4500,
            oldPrice: 5000,
            category: "protein",
            tag: "⭐ Customer Favorite"
        }
    ],
    
    dishes: [
        {
            id: 4,
            name: "Fried Rice with Beef",
            image: "assets/Fried Rice with Beef.jpeg",
            description: "Chinese-style fried rice with Nigerian twist, served with beef",
            price: 3200,
            category: "rice",
            spice: 2
        },
        {
            id: 5,
            name: "Pounded Yam & Egusi",
            image: "assets/Pounded Yam & Egusi.jpeg",
            description: "Soft pounded yam served with rich egusi soup and assorted meat",
            price: 3800,
            category: "swallow",
            spice: 3
        },
        {
            id: 6,
            name: "Amala & Ewedu",
            image: "assets/Amala & Ewedu.jpeg",
            description: "Authentic yoruba dish - amala served with ewedu and gbegiri soup",
            price: 3000,
            category: "swallow",
            spice: 4
        },
        {
            id: 7,
            name: "Ofada Rice & Sauce",
            image: "assets/Ofada Rice & Sauce.jpeg",
            description: "Local ofada rice served with special ayamase sauce and ponmo",
            price: 4000,
            category: "rice",
            spice: 5
        },
        {
            id: 8,
            name: "Banga Soup & Starch",
            image: "assets/Banga Soup & Starch.jpeg",
            description: "Delta-style palm nut soup with starch and fresh fish",
            price: 3500,
            category: "soup",
            spice: 3
        },
        {
            id: 9,
            name: "Nkwobi",
            image: "assets/Nkwobi.jpeg",
            description: "Spicy cow foot delicacy served with utazi leaves",
            price: 4200,
            category: "protein",
            spice: 5
        }
    ],
    
    snacks: [
        {
            id: 10,
            name: "Puff Puff",
            image: "assets/Puff Puff.jpeg",
            description: "Sweet deep-fried dough balls - 10 pieces",
            price: 800,
            category: "fried",
            type: "sweet"
        },
        {
            id: 11,
            name: "Akara & Pap",
            image: "assets/Akara & Pap.jpeg",
            description: "Bean cakes with akamu (pap) - breakfast special",
            price: 1500,
            category: "breakfast",
            type: "savory"
        },
        {
            id: 12,
            name: "Meat Pie",
            image: "assets/Meat Pie.jpeg",
            description: "Flaky pastry filled with minced meat and potatoes - 3 pieces",
            price: 1200,
            category: "pastry",
            type: "savory"
        },
        {
            id: 13,
            name: "Boli & Fish",
            image: "assets/Boli & Fish.jpeg",
            description: "Roasted plantain with grilled fish and peanut sauce",
            price: 2500,
            category: "grilled",
            type: "savory"
        },
        {
            id: 14,
            name: "Small Chops Platter",
            image: "assets/Small Chops Platter.jpeg",
            description: "Assorted: samosa, spring rolls, chicken wings, puff puff",
            price: 5000,
            category: "assorted",
            type: "mixed"
        }
    ],
    
    soups: [
        {
            id: 15,
            name: "Ogbono Soup",
            image: "assets/Ogbono Soup.jpeg",
            description: "Draw soup with assorted meat and fish",
            price: 3200,
            swallow: "fufu",
            spice: 3
        },
        {
            id: 16,
            name: "Vegetable Soup",
            image: "assets/Vegetable Soup.jpeg",
            description: "Fresh vegetable soup with beef and stockfish",
            price: 2800,
            swallow: "semo",
            spice: 2
        },
        {
            id: 17,
            name: "Okra Soup",
            image: "assets/Okra Soup.jpeg",
            description: "Sliced okra soup with prawns and periwinkle",
            price: 3500,
            swallow: "eba",
            spice: 3
        },
        {
            id: 18,
            name: "Afang Soup",
            image: "assets/Afang Soup.jpeg",
            description: "Efik delicacy with waterleaf and afang leaves",
            price: 4000,
            swallow: "pounded yam",
            spice: 4
        }
    ]
};

// Cart state
let cart = [];
let cartCount = 0;
let cartSubtotal = 0;
const deliveryFee = 500;

// DOM Elements
const featuredGrid = document.querySelector('.featured-grid');
const dishesGrid = document.querySelector('.dishes-grid');
const snacksGrid = document.querySelector('.snacks-grid');
const soupsGrid = document.querySelector('.soups-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartSubtotalElement = document.querySelector('.subtotal');
const totalPriceElement = document.querySelector('.total-price');
const cartCountElement = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');

// Authentication utilities
function setToken(token) {
    localStorage.setItem('nf_token', token);
}

function getToken() {
    return localStorage.getItem('nf_token');
}

function clearToken() {
    localStorage.removeItem('nf_token');
}

function getAuthHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function fetchMe() {
    const token = getToken();
    if (!token) return null;
    try {
        const res = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Not authenticated');
        return await res.json();
    } catch (e) {
        clearToken();
        return null;
    }
}

function updateAuthUI(user) {
    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const userName = document.querySelector('.user-name');

    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-flex';
        userName.style.display = 'inline';
        userName.textContent = user.name;
    } else {
        loginBtn.style.display = 'inline-flex';
        logoutBtn.style.display = 'none';
        userName.style.display = 'none';
        userName.textContent = '';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    renderFeatured();
    renderDishes();
    renderSnacks();
    renderSoups();
    setupEventListeners();
    setupCategoryTabs();

    // Auth UI wiring
    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const authModal = document.getElementById('authModal');
    const closeAuth = document.querySelector('.close-auth');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginBtn.addEventListener('click', () => authModal.classList.add('show'));
    closeAuth.addEventListener('click', () => authModal.classList.remove('show'));
    authModal.addEventListener('click', (e) => { if (e.target === authModal) authModal.classList.remove('show'); });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        try {
            const res = await fetch('/api/login', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ email, password }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            setToken(data.token);
            updateAuthUI(data.user);
            authModal.classList.remove('show');
            showNotification('Logged in successfully', 'success');
        } catch (err) {
            showNotification(err.message || 'Login error', 'error');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        try {
            const res = await fetch('/api/register', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ name, email, password }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Register failed');
            setToken(data.token);
            updateAuthUI(data.user);
            authModal.classList.remove('show');
            showNotification('Account created and logged in', 'success');
        } catch (err) {
            showNotification(err.message || 'Register error', 'error');
        }
    });

    logoutBtn.addEventListener('click', () => {
        clearToken();
        updateAuthUI(null);
        showNotification('Logged out', 'info');
    });

    // Check existing token
    const currentUser = await fetchMe();
    updateAuthUI(currentUser);
});

// Override checkout to call backend orders
async function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const token = getToken();
    if (!token) {
        showNotification('Please sign in to place an order', 'warning');
        document.getElementById('authModal').classList.add('show');
        return;
    }

    const orderPayload = {
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        subtotal: cartSubtotal,
        address: 'Not provided'
    };

    try {
        const res = await fetch('/api/orders', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(orderPayload) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Order failed');

        // Clear cart and show success
        cart = [];
        updateCartCount();
        renderCart();
        cartModal.style.display = 'none';
        showNotification('Order placed! Order ID: ' + data.order.id, 'success');
    } catch (err) {
        showNotification(err.message || 'Order error', 'error');
    }
}

// Render featured dishes
function renderFeatured() {
    featuredGrid.innerHTML = '';
    
    nigerianFoods.featured.forEach(item => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        card.innerHTML = `
            <div class="featured-tag">${item.tag}</div>
            <div class="featured-image">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<div class="image-placeholder"><span>🍲</span></div>`}
            </div>
            <div class="featured-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="featured-price">
                    ₦${item.price.toLocaleString()}
                    <span>₦${item.oldPrice.toLocaleString()}</span>
                </div>
                <button class="btn add-to-cart-btn" data-id="${item.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

// Render main dishes
function renderDishes() {
    dishesGrid.innerHTML = '';
    
    nigerianFoods.dishes.forEach(item => {
        const card = createFoodCard(item);
        dishesGrid.appendChild(card);
    });
}

// Render snacks
function renderSnacks() {
    snacksGrid.innerHTML = '';
    
    nigerianFoods.snacks.forEach(item => {
        const card = createFoodCard(item);
        snacksGrid.appendChild(card);
    });
}

// Render soups
function renderSoups() {
    soupsGrid.innerHTML = '';
    
    nigerianFoods.soups.forEach(item => {
        const card = createFoodCard(item);
        soupsGrid.appendChild(card);
    });
}

// Create food card template
function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <div class="food-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<div class="image-placeholder small"><span>🍽️</span></div>`}
        </div>
        <div class="food-info">
            <h3>${item.name}</h3>
            <p class="food-description">${item.description}</p>
            <div class="food-meta">
                <div class="food-price">₦${item.price.toLocaleString()}</div>
                <div class="food-category">${getCategoryIcon(item.category)} ${item.category}</div>
            </div>
            <div class="food-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity-display" data-id="${item.id}">1</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="btn add-to-cart-btn" data-id="${item.id}">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    return card;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'rice': '🍚',
        'swallow': '🥣',
        'soup': '🥘',
        'protein': '🍗',
        'fried': '🔥',
        'breakfast': '🌅',
        'pastry': '🥮',
        'grilled': '🔥',
        'assorted': '🍱'
    };
    return icons[category] || '🍽️';
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn') || 
            e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.classList.contains('add-to-cart-btn') ? 
                       e.target : e.target.closest('.add-to-cart-btn');
            const itemId = parseInt(btn.dataset.id);
            const quantity = getQuantityForItem(itemId);
            addToCart(itemId, quantity);
        }
        
        // Quantity buttons
        if (e.target.classList.contains('quantity-btn')) {
            const btn = e.target;
            const itemId = parseInt(btn.dataset.id);
            const isPlus = btn.classList.contains('plus');
            updateQuantity(itemId, isPlus);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart();
    });
    
    // Close cart
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    // Close cart when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', checkout);
    
    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Find food button
    document.querySelector('.find-food-btn').addEventListener('click', findFood);
}

// Setup category tabs
function setupCategoryTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter dishes
            const category = btn.dataset.category;
            filterDishes(category);
        });
    });
}

// Filter dishes by category
function filterDishes(category) {
    const allCards = document.querySelectorAll('.dishes-grid .food-card');
    
    allCards.forEach(card => {
        const itemId = parseInt(card.querySelector('.add-to-cart-btn').dataset.id);
        const item = [...nigerianFoods.dishes, ...nigerianFoods.featured].find(d => d.id === itemId);
        
        if (category === 'all' || item.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Get quantity for item
function getQuantityForItem(itemId) {
    const quantityDisplay = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
    return quantityDisplay ? parseInt(quantityDisplay.textContent) : 1;
}

// Update quantity display
function updateQuantity(itemId, isPlus) {
    const quantityDisplay = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
    if (!quantityDisplay) return;
    
    let quantity = parseInt(quantityDisplay.textContent);
    if (isPlus) {
        quantity++;
    } else if (quantity > 1) {
        quantity--;
    }
    quantityDisplay.textContent = quantity;
}

// Add item to cart
function addToCart(itemId, quantity = 1) {
    // Find item in all food categories
    let item = null;
    
    // Check featured
    item = nigerianFoods.featured.find(f => f.id === itemId);
    
    // Check dishes
    if (!item) item = nigerianFoods.dishes.find(d => d.id === itemId);
    
    // Check snacks
    if (!item) item = nigerianFoods.snacks.find(s => s.id === itemId);
    
    // Check soups
    if (!item) item = nigerianFoods.soups.find(s => s.id === itemId);
    
    if (!item) return;
    
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }
    
    updateCartCount();
    showNotification(`${item.name} added to cart!`, 'success');
    
    // Reset quantity display
    const quantityDisplay = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
    if (quantityDisplay) {
        quantityDisplay.textContent = 1;
    }
}

// Update cart count
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // Update cart subtotal
    cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotalElement.textContent = `₦${cartSubtotal.toLocaleString()}`;
    
    // Update total (with delivery fee)
    const total = cartSubtotal + (cartSubtotal >= 5000 ? 0 : deliveryFee);
    totalPriceElement.textContent = `₦${total.toLocaleString()}`;
    
    // Update delivery fee display
    document.querySelector('.delivery-fee').textContent = 
        cartSubtotal >= 5000 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`;
}

// Render cart items
function renderCart() {
    cartItems.innerHTML = '';
    cartSubtotal = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious Naija food to get started!</p>
                <button class="btn" onclick="cartModal.style.display='none'">
                    <i class="fas fa-utensils"></i> Browse Menu
                </button>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartSubtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₦${item.price.toLocaleString()} × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-price">₦${itemTotal.toLocaleString()}</span>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartCount();
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('.remove-item').dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCart();
    showNotification('Item removed from cart', 'warning');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const orderId = 'NF' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const total = cartSubtotal + (cartSubtotal >= 5000 ? 0 : deliveryFee);
    
    // Show order summary
    const summary = cart.map(item => 
        `${item.quantity}× ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    alert(`✅ Order Successful!\n\nOrder ID: ${orderId}\n\nItems:\n${summary}\n\nSubtotal: ₦${cartSubtotal.toLocaleString()}\nDelivery: ${cartSubtotal >= 5000 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}\nTotal: ₦${total.toLocaleString()}\n\nYour Naija food will arrive in 30-45 minutes!`);
    
    // Clear cart
    cart = [];
    updateCartCount();
    renderCart();
    cartModal.style.display = 'none';
    
    // Show thank you message
    showNotification('Order placed successfully! Expect delivery soon.', 'success');
}

// Find food function
function findFood() {
    const locationInput = document.querySelector('.location-input input');
    const location = locationInput.value.trim();
    
    if (!location) {
        showNotification('Please enter your location', 'error');
        locationInput.focus();
        return;
    }
    
    showNotification(`Searching for Naija food in ${location}...`, 'info');
    
    // Simulate search
    setTimeout(() => {
        const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Benin'];
        if (locations.some(loc => location.toLowerCase().includes(loc.toLowerCase()))) {
            showNotification(`🎉 Great! We deliver to ${location}. Start ordering!`, 'success');
        } else {
            showNotification(`We're not in ${location} yet. Try Lagos, Abuja, or Port Harcourt.`, 'warning');
        }
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}" 
               style="font-size: 20px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .empty-cart {
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }
    
    .empty-cart h3 {
        margin-bottom: 10px;
        color: var(--dark);
    }
    
    .empty-cart button {
        margin-top: 20px;
    }
    
    .spice-level {
        display: flex;
        gap: 5px;
        margin: 10px 0;
    }
    
    .spice-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ddd;
    }
    
    .spice-dot.active {
        background: var(--primary);
    }
`;
document.head.appendChild(style);