// Enhanced product database with more realistic data
const productDatabase = {
    manila: [
        {
            id: 1,
            name: "Coca-Cola 330ml",
            category: "beverages",
            brand: "Coca-Cola",
            image: "🥤",
            prices: [
                { store: "alfamart", price: 8.5, location: "Manila Central", distance: 0.5 },
                { store: "seven-eleven", price: 9.0, location: "Manila Downtown", distance: 0.8 },
                { store: "dali", price: 7.8, location: "Manila Market", distance: 1.2 },
                { store: "indomaret", price: 8.2, location: "Manila Bay", distance: 0.9 }
            ]
        },
        {
            id: 2,
            name: "Lays Classic Potato Chips",
            category: "snacks",
            brand: "Lays",
            image: "🍟",
            prices: [
                { store: "alfamart", price: 12.5, location: "Manila Central", distance: 0.5 },
                { store: "seven-eleven", price: 13.0, location: "Manila Downtown", distance: 0.8 },
                { store: "dali", price: 11.0, location: "Manila Market", distance: 1.2 },
                { store: "puregold", price: 10.5, location: "Manila Mall", distance: 1.5 }
            ]
        },
        // Add more products...
    ],
    "quezon-city": [
        // Different prices for Quezon City
        {
            id: 1,
            name: "Coca-Cola 330ml",
            category: "beverages",
            brand: "Coca-Cola",
            image: "🥤",
            prices: [
                { store: "alfamart", price: 8.8, location: "QC Central", distance: 0.3 },
                { store: "seven-eleven", price: 9.2, location: "QC Business", distance: 0.6 },
                { store: "dali", price: 8.0, location: "QC Market", distance: 1.0 }
            ]
        },
        // Add more location-specific products...
    ]
};

// Store database with actual locations
const storesDatabase = {
    manila: [
        { id: 1, name: "Alfamart Manila Central", type: "alfamart", lat: 14.5995, lng: 120.9842, distance: 0.5 },
        { id: 2, name: "7-Eleven Manila Downtown", type: "seven-eleven", lat: 14.6000, lng: 120.9800, distance: 0.8 },
        { id: 3, name: "Dali Manila Market", type: "dali", lat: 14.5980, lng: 120.9900, distance: 1.2 },
        { id: 4, name: "Indomaret Manila Bay", type: "indomaret", lat: 14.6020, lng: 120.9750, distance: 0.9 }
    ],
    "quezon-city": [
        { id: 1, name: "Alfamart QC Central", type: "alfamart", lat: 14.6760, lng: 121.0437, distance: 0.3 },
        { id: 2, name: "7-Eleven QC Business", type: "seven-eleven", lat: 14.6740, lng: 121.0400, distance: 0.6 },
        { id: 3, name: "Dali QC Market", type: "dali", lat: 14.6780, lng: 121.0470, distance: 1.0 }
    ]
};

let currentLocation = '';
let currentProducts = [];
let displayedProducts = 12;
let currentSearchTerm = '';
let map;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Set up location selector
    const locationSelect = document.getElementById('locationSelect');
    locationSelect.addEventListener('change', function() {
        currentLocation = this.value;
        if (currentLocation) {
            loadLocationData(currentLocation);
            document.getElementById('locationPrompt').style.display = 'none';
        }
    });
    
    // Load default location (Manila)
    currentLocation = 'manila';
    locationSelect.value = 'manila';
    loadLocationData(currentLocation);
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', function() {
        if (this.value.length >= 2) {
            performSearch();
        } else if (this.value.length === 0) {
            clearSearch();
        }
    });
}

function loadLocationData(location) {
    showLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
        currentProducts = productDatabase[location] || [];
        const stores = storesDatabase[location] || [];
        
        updateQuickStats(stores.length, currentProducts.length);
        loadFeaturedProducts();
        loadAllProducts();
        loadStoresGrid(stores);
        initializeMap(stores);
        loadCategories();
        
        showLoading(false);
    }, 1000);
}

function updateQuickStats(storeCount, productCount) {
    document.getElementById('totalStores').textContent = storeCount;
    document.getElementById('totalProducts').textContent = productCount;
    document.getElementById('avgSavings').textContent = '15%';
    document.getElementById('priceUpdates').textContent = Math.floor(Math.random() * 50) + 10;
}

function performSearch() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase().trim();
    
    if (searchTerm.length < 2) {
        clearSearch();
        return;
    }
    
    currentSearchTerm = searchTerm;
    
    const filteredProducts = currentProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(filteredProducts, searchTerm);
}

function displaySearchResults(products, searchTerm) {
    const resultsHeader = document.getElementById('searchResultsHeader');
    const searchQuery = document.getElementById('searchQuery');
    
    resultsHeader.style.display = 'flex';
    searchQuery.textContent = searchTerm;
    
    displayProducts(products);
    document.getElementById('loadMoreContainer').style.display = 'none';
}

function clearSearch() {
    currentSearchTerm = '';
    document.getElementById('productSearch').value = '';
    document.getElementById('searchResultsHeader').style.display = 'none';
    loadAllProducts();
}

function handleSearchKeypress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featured = currentProducts.slice(0, 6);
    
    featuredContainer.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    displayedProducts = 12;
    displayProducts(currentProducts.slice(0, displayedProducts));
    document.getElementById('loadMoreContainer').style.display = 'block';
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => createProductCard(product, true)).join('');
}

function createProductCard(product, showComparison = false) {
    const bestPrice = Math.min(...product.prices.map(p => p.price));
    const bestStore = product.prices.find(p => p.price === bestPrice);
    
    if (!showComparison) {
        return `
            <div class="product-card" data-category="${product.category}" data-stores="${product.prices.map(p => p.store).join(',')}">
                <div class="product-image">
                    ${product.image}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-category">${formatCategory(product.category)}</div>
                    <div class="product-prices">
                        <div class="price">₱${bestPrice.toFixed(2)}</div>
                        <span class="store-badge ${bestStore.store}">${formatStoreName(bestStore.store)}</span>
                    </div>
                    <div class="product-distance">${bestStore.distance}km away</div>
                </div>
            </div>
        `;
    }
    
    const priceComparison = product.prices.map(price => `
        <div class="store-price ${bestStore.store === price.store ? 'lowest' : ''}">
            <div>
                <span class="store-name">${formatStoreName(price.store)}</span>
                <div class="store-location">${price.location}</div>
            </div>
            <div class="price-info">
                <span class="price-amount">₱${price.price.toFixed(2)}</span>
                <div class="store-distance">${price.distance}km</div>
            </div>
        </div>
    `).join('');

    return `
        <div class="product-card" data-category="${product.category}" data-stores="${product.prices.map(p => p.store).join(',')}">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-brand">${product.brand}</div>
                <div class="product-category">${formatCategory(product.category)}</div>
                <div class="price-comparison">
                    ${priceComparison}
                </div>
            </div>
        </div>
    `;
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const store = document.getElementById('storeFilter').value;
    
    let filtered = currentProducts;
    
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    if (store !== 'all') {
        filtered = filtered.filter(product => 
            product.prices.some(price => price.store === store)
        );
    }
    
    if (currentSearchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.brand.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    displayedProducts = 12;
    displayProducts(filtered.slice(0, displayedProducts));
}

function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    let sorted = [...currentProducts];
    
    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) => {
                const aMin = Math.min(...a.prices.map(p => p.price));
                const bMin = Math.min(...b.prices.map(p => p.price));
                return aMin - bMin;
            });
            break;
        case 'price-high':
            sorted.sort((a, b) => {
                const aMin = Math.min(...a.prices.map(p => p.price));
                const bMin = Math.min(...b.prices.map(p => p.price));
                return bMin - aMin;
            });
            break;
        case 'savings':
            // Sort by price range (biggest difference between stores)
            sorted.sort((a, b) => {
                const aRange = Math.max(...a.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price));
                const bRange = Math.max(...b.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price));
                return bRange - aRange;
            });
            break;
        case 'name':
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayProducts(sorted.slice(0, displayedProducts));
}

function loadMoreProducts() {
    displayedProducts += 12;
    const productsToShow = currentSearchTerm ? 
        currentProducts.filter(p => 
            p.name.toLowerCase().includes(currentSearchTerm) ||
            p.brand.toLowerCase().includes(currentSearchTerm)
        ) : currentProducts;
    
    displayProducts(productsToShow.slice(0, displayedProducts));
    
    if (displayedProducts >= productsToShow.length) {
        document.getElementById('loadMoreContainer').style.display = 'none';
    }
}

function loadCategories() {
    const categories = {
        'beverages': '🥤',
        'snacks': '🍿',
        'dairy': '🥛',
        'personal-care': '🧴',
        'frozen': '❄️',
        'bakery': '🍞',
        'household': '🏠'
    };
    
    const container = document.getElementById('categoryGrid');
    container.innerHTML = Object.entries(categories).map(([id, icon]) => `
        <a href="#" class="category-card" onclick="filterByCategory('${id}')">
            <div class="category-icon">${icon}</div>
            <div class="category-name">${formatCategory(id)}</div>
        </a>
    `).join('');
}

function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    filterProducts();
    
    // Scroll to comparison section
    document.getElementById('compare').scrollIntoView({ behavior: 'smooth' });
}

function initializeMap(stores) {
    const mapContainer = document.getElementById('storeMap');
    
    if (!mapContainer) return;
    
    // Clear existing map
    if (map) {
        map.remove();
    }
    
    // Initialize map (using Manila as center)
    map = L.map('storeMap').setView([14.5995, 120.9842], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add store markers
    stores.forEach(store => {
        const marker = L.marker([store.lat, store.lng]).addTo(map);
        marker.bindPopup(`
            <strong>${store.name}</strong><br>
            ${formatStoreName(store.type)}<br>
            Distance: ${store.distance}km
        `);
    });
    
    // Load store list
    loadStoreList(stores);
}

function loadStoreList(stores) {
    const container = document.getElementById('storeList');
    
    container.innerHTML = stores.map(store => `
        <div class="store-list-item" onclick="focusOnStore(${store.lat}, ${store.lng})">
            <div class="store-name">${store.name}</div>
            <div class="store-type">${formatStoreName(store.type)}</div>
            <div class="store-distance">${store.distance}km away</div>
        </div>
    `).join('');
}

function focusOnStore(lat, lng) {
    map.setView([lat, lng], 16);
}

function loadStoresGrid(stores) {
    const container = document.getElementById('storesGrid');
    
    container.innerHTML = stores.map(store => `
        <div class="store-card">
            <div class="store-icon ${store.type}">
                <i class="fas fa-store"></i>
            </div>
            <h3>${store.name}</h3>
            <p>${formatStoreName(store.type)}</p>
            <div class="store-stats">
                <span>${store.distance}km away</span>
                <span>Open until 10PM</span>
            </div>
            <button class="store-view-btn" onclick="focusOnStore(${store.lat}, ${store.lng})">
                View on Map
            </button>
        </div>
    `).join('');
}

function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'flex' : 'none';
}

// Helper functions (keep these from previous version)
function formatStoreName(store) {
    const storeNames = {
        'alfamart': 'Alfamart',
        'seven-eleven': '7-Eleven',
        'dali': 'Dali',
        'indomaret': 'Indomaret',
        'puregold': 'Puregold',
        'robinsons': 'Robinsons'
    };
    return storeNames[store] || store;
}

function formatCategory(category) {
    const categoryNames = {
        'beverages': 'Beverages',
        'snacks': 'Snacks',
        'dairy': 'Dairy',
        'personal-care': 'Personal Care',
        'frozen': 'Frozen Foods',
        'bakery': 'Bakery',
        'household': 'Household'
    };
    return categoryNames[category] || category;
}

// Mobile menu functionality (keep from previous version)
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling (keep from previous version)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});