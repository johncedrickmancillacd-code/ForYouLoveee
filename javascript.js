// --- 1. THE DATABASE (Simulated Real-World Data) ---
// In a real app, this comes from a Server/API. Here, we store it locally to make it work immediately.

const PRODUCTS_DB = [
    { id: 1, name: 'Coke 1.5L', category: 'Beverage' },
    { id: 2, name: 'Gardenia Loaf Bread', category: 'Bakery' },
    { id: 3, name: 'Cup Noodles Beef', category: 'Pantry' },
    { id: 4, name: 'Rice 1kg', category: 'Pantry' },
    { id: 5, name: 'Eggs (Dozen)', category: 'Fresh' },
    { id: 6, name: 'San Mig Light', category: 'Beverage' }
];

// We generate random nearby stores to simulate the "Scan" feature
const STORES_DB = [
    { 
        id: 101, 
        name: '7-Eleven', 
        type: 'Convenience', 
        latOffset: 0.001, // Simulated distance
        inventory: { 'Coke 1.5L': 85, 'Gardenia Loaf Bread': 80, 'Cup Noodles Beef': 45, 'San Mig Light': 55 }
    },
    { 
        id: 102, 
        name: 'Alfamart', 
        type: 'Convenience', 
        latOffset: -0.002, 
        inventory: { 'Coke 1.5L': 80, 'Gardenia Loaf Bread': 78, 'Cup Noodles Beef': 40, 'Rice 1kg': 55, 'Eggs (Dozen)': 110 }
    },
    { 
        id: 103, 
        name: 'Dali Everyday Grocery', 
        type: 'Grocery', 
        latOffset: 0.003, 
        inventory: { 'Coke 1.5L': 75, 'Gardenia Loaf Bread': 72, 'Cup Noodles Beef': 38, 'Rice 1kg': 50, 'Eggs (Dozen)': 100, 'San Mig Light': 48 }
    },
    { 
        id: 104, 
        name: 'Uncle John\'s', 
        type: 'Convenience', 
        latOffset: -0.001, 
        inventory: { 'Coke 1.5L': 86, 'Cup Noodles Beef': 44, 'San Mig Light': 52 }
    }
];

// --- 2. GEOLOCATION LOGIC ---

let userPosition = null;

function initApp() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userPosition = position.coords;
                document.getElementById('user-coords').innerText = 
                    `Lat: ${userPosition.latitude.toFixed(4)}, Lon: ${userPosition.longitude.toFixed(4)}`;
                renderStores(); // Load stores once location is found
            },
            (error) => {
                document.getElementById('user-coords').innerText = "Location Denied";
                alert("We need your location to find nearby stores. Using default mode.");
                renderStores();
            }
        );
    } else {
        document.getElementById('user-coords').innerText = "GPS Not Supported";
    }
}

// Helper: Calculate rough distance (Haversine simplified for demo)
function getDistance(store) {
    // Just generating a realistic looking "meters" distance for the demo
    // In a real app, we use userPosition.latitude vs store.latOffset
    const baseDist = Math.abs(store.latOffset * 100000); 
    return Math.round(baseDist + (Math.random() * 100)); 
}

// --- 3. SEARCH & COMPARE LOGIC ---

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const scanner = document.getElementById('scanner');
    const resultsArea = document.getElementById('results-area');
    const list = document.getElementById('results-list');

    if (!query) return alert("Please enter a product name.");

    // UI: Show scanning animation
    resultsArea.classList.add('hidden');
    scanner.classList.remove('hidden');

    // Logic: Simulate network delay (1.5 seconds)
    setTimeout(() => {
        scanner.classList.add('hidden');
        list.innerHTML = '';
        
        let foundItems = [];

        // 1. Scan all stores
        STORES_DB.forEach(store => {
            // Check if store has items matching the search query
            for (const [product, price] of Object.entries(store.inventory)) {
                if (product.toLowerCase().includes(query)) {
                    foundItems.push({
                        storeName: store.name,
                        distance: getDistance(store),
                        productName: product,
                        price: price
                    });
                }
            }
        });

        if (foundItems.length === 0) {
            list.innerHTML = '<p style="text-align:center">No items found nearby.</p>';
            resultsArea.classList.remove('hidden');
            return;
        }

        // 2. Sort by Price (Cheapest first)
        foundItems.sort((a, b) => a.price - b.price);

        // 3. Display Results
        const bestPrice = foundItems[0].price;

        foundItems.forEach(item => {
            const isCheapest = item.price === bestPrice;
            const div = document.createElement('div');
            div.className = `result-card ${isCheapest ? 'cheapest' : ''}`;
            
            div.innerHTML = `
                <div class="store-details">
                    <h4>${item.storeName} ${isCheapest ? '<span class="badge">BEST DEAL</span>' : ''}</h4>
                    <p><i class="fas fa-walking"></i> ${item.distance}m away &bull; ${item.productName}</p>
                </div>
                <div class="price-tag">
                    ₱${item.price.toFixed(2)}
                </div>
            `;
            list.appendChild(div);
        });

        resultsArea.classList.remove('hidden');

    }, 1500); // End Timeout
}

// --- 4. STORE BROWSER LOGIC ---

function renderStores() {
    const grid = document.getElementById('store-grid');
    grid.innerHTML = '';

    STORES_DB.forEach(store => {
        const card = document.createElement('div');
        card.className = 'store-card';
        card.onclick = () => openStoreModal(store);
        card.innerHTML = `
            <div class="store-icon"><i class="fas fa-store-alt"></i></div>
            <strong>${store.name}</strong><br>
            <small>${store.type}</small><br>
            <small style="color:green">${getDistance(store)}m away</small>
        `;
        grid.appendChild(card);
    });
}

// --- 5. MODAL LOGIC ---

function openStoreModal(store) {
    const modal = document.getElementById('store-modal');
    document.getElementById('modal-store-name').innerText = store.name;
    document.getElementById('modal-store-distance').innerText = `${getDistance(store)} meters away`;
    
    const itemsContainer = document.getElementById('modal-store-items');
    itemsContainer.innerHTML = '';

    // List all items in that store
    for (const [item, price] of Object.entries(store.inventory)) {
        const row = document.createElement('div');
        row.className = 'catalog-item';
        row.innerHTML = `<span>${item}</span> <strong>₱${price.toFixed(2)}</strong>`;
        itemsContainer.appendChild(row);
    }

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById('store-modal').style.display = "none";
}

// Close modal if clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('store-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Start the app
initApp();
