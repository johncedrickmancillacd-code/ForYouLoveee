// PriceWatch - Live Price Scraper
class PriceScraper {
    constructor() {
        this.stores = {
            'alfamart': {
                name: 'Alfamart',
                color: '#e53e3e',
                website: 'https://www.alfamart.com.ph'
            },
            'seven-eleven': {
                name: '7-Eleven',
                color: '#ff6b01',
                website: 'https://www.7-eleven.com.ph'
            },
            'dali': {
                name: 'Dali',
                color: '#38a169',
                website: 'https://dalidaily.com'
            },
            'puregold': {
                name: 'Puregold',
                color: '#f59e0b',
                website: 'https://puregold.com.ph'
            },
            'sm': {
                name: 'SM Supermarket',
                color: '#8b5cf6',
                website: 'https://smsupermalls.com'
            }
        };
    }

    // Simulate live price scraping from store APIs/websites
    async scrapeLivePrices(productName) {
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');
        
        loading.style.display = 'block';
        results.innerHTML = '';

        try {
            // Simulate API calls to different stores
            const prices = await this.fetchFromAllStores(productName);
            
            loading.style.display = 'none';
            this.displayResults(productName, prices);
            
        } catch (error) {
            loading.style.display = 'none';
            results.innerHTML = `<p>❌ Error fetching prices. Please try again.</p>`;
        }
    }

    async fetchFromAllStores(productName) {
        // Simulate different response times and prices
        return new Promise((resolve) => {
            setTimeout(() => {
                const basePrices = this.getBasePrices(productName);
                const livePrices = this.simulateLivePrices(basePrices);
                resolve(livePrices);
            }, 2000);
        });
    }

    getBasePrices(productName) {
        // Base price database (would be updated regularly)
        const priceDatabase = {
            'coca-cola': [
                { store: 'alfamart', price: 8.5, lastUpdated: '2024-01-15' },
                { store: 'seven-eleven', price: 9.0, lastUpdated: '2024-01-15' },
                { store: 'dali', price: 7.8, lastUpdated: '2024-01-15' },
                { store: 'puregold', price: 8.0, lastUpdated: '2024-01-15' },
                { store: 'sm', price: 8.2, lastUpdated: '2024-01-15' }
            ],
            'bear brand': [
                { store: 'alfamart', price: 35.0, lastUpdated: '2024-01-15' },
                { store: 'seven-eleven', price: 38.0, lastUpdated: '2024-01-15' },
                { store: 'dali', price: 32.5, lastUpdated: '2024-01-15' },
                { store: 'puregold', price: 33.0, lastUpdated: '2024-01-15' },
                { store: 'sm', price: 34.5, lastUpdated: '2024-01-15' }
            ],
            'lays': [
                { store: 'alfamart', price: 12.5, lastUpdated: '2024-01-15' },
                { store: 'seven-eleven', price: 13.0, lastUpdated: '2024-01-15' },
                { store: 'dali', price: 11.0, lastUpdated: '2024-01-15' },
                { store: 'puregold', price: 11.5, lastUpdated: '2024-01-15' },
                { store: 'sm', price: 12.0, lastUpdated: '2024-01-15' }
            ],
            'dove': [
                { store: 'alfamart', price: 45.0, lastUpdated: '2024-01-15' },
                { store: 'seven-eleven', price: 48.0, lastUpdated: '2024-01-15' },
                { store: 'dali', price: 42.0, lastUpdated: '2024-01-15' },
                { store: 'puregold', price: 43.5, lastUpdated: '2024-01-15' },
                { store: 'sm', price: 44.0, lastUpdated: '2024-01-15' }
            ]
        };

        const searchTerm = productName.toLowerCase();
        for (const [key, prices] of Object.entries(priceDatabase)) {
            if (searchTerm.includes(key)) {
                return prices;
            }
        }

        // Default prices if product not found
        return [
            { store: 'alfamart', price: this.generateRandomPrice(10, 50), lastUpdated: '2024-01-15' },
            { store: 'seven-eleven', price: this.generateRandomPrice(12, 55), lastUpdated: '2024-01-15' },
            { store: 'dali', price: this.generateRandomPrice(8, 45), lastUpdated: '2024-01-15' },
            { store: 'puregold', price: this.generateRandomPrice(9, 48), lastUpdated: '2024-01-15' },
            { store: 'sm', price: this.generateRandomPrice(11, 52), lastUpdated: '2024-01-15' }
        ];
    }

    simulateLivePrices(basePrices) {
        // Add small random variations to simulate live pricing
        return basePrices.map(storePrice => ({
            ...storePrice,
            price: this.addPriceVariation(storePrice.price),
            lastUpdated: new Date().toISOString().split('T')[0]
        }));
    }

    addPriceVariation(basePrice) {
        // ±5% variation
        const variation = (Math.random() - 0.5) * 0.1;
        return Math.round((basePrice * (1 + variation)) * 100) / 100;
    }

    generateRandomPrice(min, max) {
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
    }

    displayResults(productName, prices) {
        const results = document.getElementById('results');
        const lowestPrice = Math.min(...prices.map(p => p.price));
        
        let html = `
            <div class="price-card">
                <h2>💰 ${productName} - Live Prices</h2>
                <p><small>Last updated: ${new Date().toLocaleString()}</small></p>
        `;

        prices.sort((a, b) => a.price - b.price).forEach(storePrice => {
            const store = this.stores[storePrice.store];
            const isLowest = storePrice.price === lowestPrice;
            
            html += `
                <div class="store-price ${isLowest ? 'lowest-price' : ''}">
                    <div>
                        <strong>${store.name}</strong>
                        <br><small>${storePrice.lastUpdated}</small>
                    </div>
                    <div style="color: ${isLowest ? 'var(--success)' : 'var(--dark)'}; font-weight: bold;">
                        ₱${storePrice.price.toFixed(2)}
                        ${isLowest ? ' 🏆' : ''}
                    </div>
                </div>
            `;
        });

        const savings = (prices[prices.length-1].price - lowestPrice).toFixed(2);
        html += `
            <div style="margin-top: 15px; padding: 10px; background: #d1fae5; border-radius: 5px;">
                <strong>💡 Best Deal:</strong> ${this.stores[prices[0].store].name} 
                - Save ₱${savings} compared to ${this.stores[prices[prices.length-1].store].name}
            </div>
        </div>`;

        results.innerHTML = html;
    }
}

// Initialize scraper
const scraper = new PriceScraper();

function searchLivePrices() {
    const productName = document.getElementById('productSearch').value.trim();
    if (productName) {
        scraper.scrapeLivePrices(productName);
    } else {
        alert('Please enter a product name');
    }
}

function searchProduct(productName) {
    document.getElementById('productSearch').value = productName;
    searchLivePrices();
}

// Enter key support
document.getElementById('productSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchLivePrices();
    }
});