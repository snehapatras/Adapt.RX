document.addEventListener('DOMContentLoaded', function() {
    // Product Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            categoryTabs.forEach(t => t.classList.remove('active'));
            categoryContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            categoryContents[index]?.classList.add('active');
        });
    });

    // Product Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productCards = document.querySelectorAll('.product-card');

    function searchProducts(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton?.addEventListener('click', () => {
        searchProducts(searchInput.value);
    });

    searchInput?.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput.value);
        }
    });

    // Product Filtering
    const categoryFilter = document.querySelector('.category-filter');
    const sortFilter = document.querySelector('.sort-filter');

    categoryFilter?.addEventListener('change', filterProducts);
    sortFilter?.addEventListener('change', filterProducts);

    function filterProducts() {
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        const products = Array.from(productCards);

        // Filter by category
        products.forEach(product => {
            if (!category || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        // Sort products
        const visibleProducts = products.filter(p => p.style.display !== 'none');
        sortProducts(visibleProducts, sortBy);
    }

    function sortProducts(products, sortBy) {
        const productsContainer = document.querySelector('.products-grid');
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            
            switch(sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return b.dataset.date - a.dataset.date;
                default: // 'popular'
                    return b.dataset.popularity - a.dataset.popularity;
            }
        });

        // Reorder elements in DOM
        products.forEach(product => {
            productsContainer.appendChild(product);
        });
    }

    // Wishlist Functionality
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Product added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Product removed from wishlist!');
            }
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'product-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const cart = document.querySelector('.cart-icon');
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('img');

            // Create flying image effect
            const flyingImage = productImage.cloneNode();
            flyingImage.style.position = 'fixed';
            flyingImage.style.height = '50px';
            flyingImage.style.width = '50px';
            flyingImage.style.borderRadius = '50%';
            flyingImage.style.zIndex = '1000';
            
            const rect = productImage.getBoundingClientRect();
            flyingImage.style.top = rect.top + 'px';
            flyingImage.style.left = rect.left + 'px';
            
            document.body.appendChild(flyingImage);

            const cartRect = cart.getBoundingClientRect();
            
            flyingImage.style.transition = 'all 0.8s ease-in-out';
            flyingImage.style.top = cartRect.top + 'px';
            flyingImage.style.left = cartRect.left + 'px';
            flyingImage.style.transform = 'scale(0.1)';
            flyingImage.style.opacity = '0';

            setTimeout(() => flyingImage.remove(), 800);
        });
    });
});

// Add these styles
const productStyles = `
    .product-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }

    .fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }

    .add-to-wishlist.active {
        color: #dc3545;
    }

    .product-card {
        transition: transform 0.3s ease;
    }

    .product-card:hover {
        transform: translateY(-5px);
    }
`;

// Add styles to document
const productStyleSheet = document.createElement('style');
productStyleSheet.textContent = productStyles;
document.head.appendChild(productStyleSheet); 