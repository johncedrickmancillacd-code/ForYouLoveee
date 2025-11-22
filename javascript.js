// Complete product database
const products = [
    {
        id: 1,
        name: "Coca-Cola 330ml",
        category: "beverages",
        brand: "Coca-Cola",
        image: "🥤",
        prices: [
            { store: "alfamart", price: 8.5 },
            { store: "seven-eleven", price: 9.0 },
            { store: "dali", price: 7.8 },
            { store: "indomaret", price: 8.2 }
        ]
    },
    {
        id: 2,
        name: "Lays Potato Chips Classic",
        category: "snacks",
        brand: "Lays",
        image: "🍟",
        prices: [
            { store: "alfamart", price: 12.5 },
            { store: "seven-eleven", price: 13.0 },
            { store: "dali", price: 11.0 },
            { store: "indomaret", price: 12.0 }
        ]
    },
    {
        id: 3,
        name: "Alaska Fresh Milk 1L",
        category: "dairy",
        brand: "Alaska",
        image: "🥛",
        prices: [
            { store: "alfamart", price: 25.0 },
            { store: "seven-eleven", price: 27.5 },
            { store: "dali", price: 22.0 },
            { store: "indomaret", price: 24.5 }
        ]
    },
    {
        id: 4,
        name: "Dove Shampoo 320ml",
        category: "personal-care",
        brand: "Dove",
        image: "🧴",
        prices: [
            { store: "alfamart", price: 45.0 },
            { store: "seven-eleven", price: 48.0 },
            { store: "dali", price: 42.0 },
            { store: "indomaret", price: 44.5 }
        ]
    },
    {
        id: 5,
        name: "Pepsi Cola 330ml",
        category: "beverages",
        brand: "Pepsi",
        image: "🥤",
        prices: [
            { store: "alfamart", price: 8.0 },
            { store: "seven-eleven", price: 8.5 },
            { store: "dali", price: 7.2 },
            { store: "indomaret", price: 7.8 }
        ]
    },
    {
        id: 6,
        name: "Toblerone Chocolate 100g",
        category: "snacks",
        brand: "Toblerone",
        image: "🍫",
        prices: [
            { store: "alfamart", price: 18.5 },
            { store: "seven-eleven", price: 20.0 },
            { store: "dali", price: 16.0 },
            { store: "indomaret", price: 17.5 }
        ]
    },
    {
        id: 7,
        name: "Bear Brand Powdered Milk",
        category: "dairy",
        brand: "Bear Brand",
        image: "🐻",
        prices: [
            { store: "alfamart", price: 35.0 },
            { store: "seven-eleven", price: 38.0 },
            { store: "dali", price: 32.5 },
            { store: "indomaret", price: 34.0 }
        ]
    },
    {
        id: 8,
        name: "Safeguard Soap 135g",
        category: "personal-care",
        brand: "Safeguard",
        image: "🧼",
        prices: [
            { store: "alfamart", price: 15.5 },
            { store: "seven-eleven", price: 16.5 },
            { store: "dali", price: 14.0 },
            { store: "indomaret", price: 15.0 }
        ]
    },
    {
        id: 9,
        name: "Royal Orange 1L",
        category: "beverages",
        brand: "Royal",
        image: "🧃",
        prices: [
            { store: "alfamart", price: 22.0 },
            { store: "seven-eleven", price: 24.0 },
            { store: "dali", price: 20.5 },
            { store: "indomaret", price: 21.5 }
        ]
    },
    {
        id: 10,
        name: "Oreo Chocolate Sandwich",
        category: "snacks",
        brand: "Oreo",
        image: "🍪",
        prices: [
            { store: "alfamart", price: 28.0 },
            { store: "seven-eleven", price: 30.0 },
            { store: "dali", price: 25.5 },
            { store: "indomaret", price: 27.0 }
        ]
    },
    {
        id: 11,
        name: "Quickmelt Cheese 165g",
        category: "dairy",
        brand: "Eden",
        image: "🧀",
        prices: [
            { store: "alfamart", price: 42.0 },
            { store: "seven-eleven", price: 45.0 },
            { store: "dali", price: 38.5 },
            { store: "indomaret", price: 40.0 }
        ]
    },
    {
        id: 12,
        name: "Colgate Toothpaste 100g",
        category: "personal-care",
        brand: "Colgate",
        image: "🦷",
        prices: [
            { store: "alfamart", price: 38.0 },
            { store: "seven-eleven", price: 40.0 },
            { store: "dali", price: 35.0 },
            { store: "indomaret", price: 37.0 }
        ]
    }
];

let currentSearchTerm = '';
let currentStoreFilter = 'all';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('PriceWatch initialized!');
    loadFeaturedProducts();
    loadAllProducts();
    setupMobileMenu();
    setupSearch();
});

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('productSearch');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Load featured products (first 6)
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.slice(0, 6);
    
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load all products for comparison
function loadAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = products.map(product => createProductComparisonCard(product)).join('');
}

// Create simple product card for featured section
function createProductCard(product) {
    const bestPrice = Math.min(...product.prices.map(p => p.price));
    const bestStore = product.prices.find(p => p.price === bestPrice).store;
    
    return `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-category">${formatCategory(product.category)}</div>
                <div class="product-prices">
                    <div class="price">₱${bestPrice.toFixed(2)}</div>
                    <span class="store-badge ${bestStore}">${formatStoreName(bestStore)}</span>
                </div>
            </div>
        </div>
    `;
}

// Create detailed product card with price comparison
function createProductComparisonCard(product) {
    const priceComparison = product.prices.map(price => {
        const isLowest = price.price === Math.min(...product.prices.map(p => p.price));
        return `
            <div class="store-price ${isLowest ? 'lowest' : ''}">
                <span class="store-name">${formatStoreName(price.store)}</span>
                <span class="price-amount">₱${price.price.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="product-card" data-category="${product.category}" data-stores="${product.prices.map(p => p.store).join(',')}">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-category">${formatCategory(product.category)} • ${product.brand}</div>
                <div class="price-comparison">
                    ${priceComparison}
                </div>
            </div>
        </div>
    `;
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('productSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        clearSearch();
        return;
    }
    
    currentSearchTerm = searchTerm;
    
    // Show search results header
    const searchResults = document.getElementById('searchResults');
    const searchQuery = document.getElementById('searchQuery');
    searchResults.style.display = 'block';
    searchQuery.textContent = searchTerm;
    
    // Filter products
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Display results
    const productsContainer = document.getElementById('productsContainer');
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 3rem; color: var(--secondary);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try searching for something else</p>
            </div>
        `;
    } else {
        productsContainer.innerHTML = filteredProducts.map(product => createProductComparisonCard(product)).join('');
    }
}

// Clear search
function clearSearch() {
    currentSearchTerm = '';
    document.getElementById('productSearch').value = '';
    document.getElementById('searchResults').style.display = 'none';
    loadAllProducts();
}

// Filter products by category and store
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const store = document.getElementById('storeFilter').value;
    currentStoreFilter = store;
    
    let filteredProducts = products;
    
    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Apply store filter
    if (store !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.prices.some(price => price.store === store)
        );
    }
    
    // Apply search filter if there's a search term
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.brand.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = filteredProducts.map(product => createProductComparisonCard(product)).join('');
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => {
                const aMin = Math.min(...a.prices.map(p => p.price));
                const bMin = Math.min(...b.prices.map(p => p.price));
                return aMin - bMin;
            });
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => {
                const aMin = Math.min(...a.prices.map(p => p.price));
                const bMin = Math.min(...b.prices.map(p => p.price));
                return bMin - aMin;
            });
            break;
        case 'name':
        default:
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = sortedProducts.map(product => createProductComparisonCard(product)).join('');
}

// Show products for a specific store
function showStoreProducts(store) {
    // Update store filter
    document.getElementById('storeFilter').value = store;
    currentStoreFilter = store;
    
    // Filter products
    const storeProducts = products.filter(product => 
        product.prices.some(price => price.store === store)
    );
    
    // Display in browse section
    const storeBrowse = document.getElementById('storeBrowse');
    storeBrowse.innerHTML = `
        <div class="store-header">
            <h3>${formatStoreName(store)} Products</h3>
            <button onclick="clearStoreFilter()" class="clear-search">Show All Stores</button>
        </div>
        <div class="store-products">
            ${storeProducts.map(product => {
                const storePrice = product.prices.find(p => p.store === store);
                return `
                    <div class="product-card">
                        <div class="product-image">
                            ${product.image}
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <div class="product-category">${formatCategory(product.category)}</div>
                            <div class="product-prices">
                                <div class="price">₱${storePrice.price.toFixed(2)}</div>
                                <span class="store-badge ${store}">${formatStoreName(store)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    // Scroll to browse section
    document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
}

// Clear store filter
function clearStoreFilter() {
    document.getElementById('storeFilter').value = 'all';
    currentStoreFilter = 'all';
    document.getElementById('storeBrowse').innerHTML = '';
    filterProducts();
}

// Show product details (placeholder for future enhancement)
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Product: ${product.name}\nBrand: ${product.brand}\nCategory: ${formatCategory(product.category)}\n\nPrice Comparison:\n${
            product.prices.map(p => `${formatStoreName(p.store)}: ₱${p.price.toFixed(2)}`).join('\n')
        }`);
    }
}

// Helper function to format store names
function formatStoreName(store) {
    const storeNames = {
        'alfamart': 'Alfamart',
        'seven-eleven': '7-Eleven',
        'dali': 'Dali',
        'indomaret': 'Indomaret'
    };
    return storeNames[store] || store;
}

// Helper function to format category names
function formatCategory(category) {
    const categoryNames = {
        'beverages': 'Beverages',
        'snacks': 'Snacks',
        'dairy': 'Dairy',
        'personal-care': 'Personal Care'
    };
    return categoryNames[category] || category;
}

// Smooth scrolling for navigation links
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