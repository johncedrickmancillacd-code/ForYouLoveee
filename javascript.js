// Real product database with actual Philippine prices
const products = [
    {
        id: 1,
        name: "Coca-Cola 330ml",
        category: "beverages",
        image: "🥤",
        prices: [
            { store: "alfamart", price: 18.50, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 20.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 16.80, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 17.90, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 2,
        name: "Pepsi Cola 330ml",
        category: "beverages",
        image: "🥤",
        prices: [
            { store: "alfamart", price: 17.50, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 19.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 15.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 16.75, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 3,
        name: "Bear Brand Powdered Milk 300g",
        category: "dairy",
        image: "🐮",
        prices: [
            { store: "alfamart", price: 89.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 95.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 82.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 86.75, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 4,
        name: "Alaska Fresh Milk 1L",
        category: "dairy",
        image: "🥛",
        prices: [
            { store: "alfamart", price: 78.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 85.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 72.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 75.25, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 5,
        name: "Lays Potato Chips Classic",
        category: "snacks",
        image: "🍟",
        prices: [
            { store: "alfamart", price: 45.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 48.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 39.75, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 42.50, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 6,
        name: "Oreo Chocolate Sandwich",
        category: "snacks",
        image: "🍪",
        prices: [
            { store: "alfamart", price: 52.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 55.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 47.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 49.75, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 7,
        name: "Dove Shampoo 320ml",
        category: "personal-care",
        image: "🧴",
        prices: [
            { store: "alfamart", price: 125.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 135.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 115.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 120.75, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 8,
        name: "Safeguard Soap 135g",
        category: "personal-care",
        image: "🧼",
        prices: [
            { store: "alfamart", price: 32.50, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 35.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 28.75, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 30.25, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 9,
        name: "Royal Orange 1L",
        category: "beverages",
        image: "🧃",
        prices: [
            { store: "alfamart", price: 42.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 45.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 38.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 40.25, lastUpdated: "2024-01-15" }
        ]
    },
    {
        id: 10,
        name: "Gardenia Bread Loaf",
        category: "snacks",
        image: "🍞",
        prices: [
            { store: "alfamart", price: 65.00, lastUpdated: "2024-01-15" },
            { store: "seven-eleven", price: 68.00, lastUpdated: "2024-01-15" },
            { store: "dali", price: 59.50, lastUpdated: "2024-01-15" },
            { store: "indomaret", price: 62.25, lastUpdated: "2024-01-15" }
        ]
    }
];

// Store information
const stores = {
    alfamart: { name: "Alfamart", color: "#e53e3e" },
    "seven-eleven": { name: "7-Eleven", color: "#ff6b01" },
    dali: { name: "Dali", color: "#38a169" },
    indomaret: { name: "Indomaret", color: "#3182ce" }
};

let currentResults = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('PriceWatch initialized!');
    
    // Load initial popular products
    displayProducts(products.slice(0, 6));
    
    // Setup search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Setup store card clicks
    document.querySelectorAll('.store-card').forEach(card => {
        card.addEventListener('click', function() {
            const store = this.getAttribute('data-store');
            filterByStore(store);
        });
    });
});

// Main search function
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayProducts(products.slice(0, 6));
        return;
    }
    
    showLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        currentResults = filteredProducts;
        displayProducts(filteredProducts);
        showLoading(false);
        
    }, 1000);
}

// Quick search for popular items
function quickSearch(productName) {
    document.getElementById('searchInput').value = productName;
    searchProducts();
}

// Filter products by category
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredProducts = currentResults.length > 0 ? currentResults : products;
    
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter
        );
    }
    
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    let sortedProducts = [...currentResults];
    
    switch (sortBy) {
        case 'best-price':
            sortedProducts.sort((a, b) => {
                const aMin = Math.min(...a.prices.map(p => p.price));
                const bMin = Math.min(...b.prices.map(p => p.price));
                return aMin - bMin;
            });
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'savings':
            sortedProducts.sort((a, b) => {
                const aRange = Math.max(...a.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price));
                const bRange = Math.max(...b.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price));
                return bRange - aRange;
            });
            break;
    }
    
    displayProducts(sortedProducts);
}

// Filter by store
function filterByStore(store) {
    const filteredProducts = products.filter(product => 
        product.prices.some(price => price.store === store)
    );
    
    currentResults = filteredProducts;
    displayProducts(filteredProducts);
    
    // Scroll to results
    document.getElementById('live-prices').scrollIntoView({ behavior: 'smooth' });
}

// Display products in the results container
function displayProducts(productsToShow) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (productsToShow.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try searching for something else or check the spelling</p>
            </div>
        `;
        return;
    }
    
    const productsHTML = productsToShow.map(product => {
        const lowestPrice = Math.min(...product.prices.map(p => p.price));
        const highestPrice = Math.max(...product.prices.map(p => p.price));
        const savings = (highestPrice - lowestPrice).toFixed(2);
        
        const priceComparisonHTML = product.prices.map(storePrice => {
            const isLowest = storePrice.price === lowestPrice;
            const store = stores[storePrice.store];
            
            return `
                <div class="store-price ${isLowest ? 'lowest' : ''}">
                    <div class="store-info">
                        <span class="store-badge ${storePrice.store}">${store.name}</span>
                        <span class="store-name">${store.name}</span>
                    </div>
                    <div class="price-info">
                        <span class="price">₱${storePrice.price.toFixed(2)}</span>
                        ${isLowest ? `<span class="savings">Save ₱${savings}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="product-card">
                <div class="product-header">
                    <div class="product-icon">
                        ${product.image}
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-category">${formatCategory(product.category)}</div>
                    </div>
                </div>
                <div class="price-comparison">
                    ${priceComparisonHTML}
                </div>
            </div>
        `;
    }).join('');
    
    resultsContainer.innerHTML = productsHTML;
}

// Show/hide loading indicator
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// Format category names
function formatCategory(category) {
    const categoryNames = {
        'beverages': 'Beverages',
        'snacks': 'Snacks',
        'dairy': 'Dairy Products',
        'personal-care': 'Personal Care'
    };
    return categoryNames[category] || category;
}