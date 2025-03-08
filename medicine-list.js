document.addEventListener('DOMContentLoaded', function() {
    // Search Functionality
    const searchInput = document.getElementById('medicineSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const medicineCards = document.querySelectorAll('.medicine-card');

    function filterMedicines() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        medicineCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const cardCategory = card.dataset.category;
            const shouldShow = 
                name.includes(searchTerm) && 
                (!category || cardCategory === category);

            card.style.display = shouldShow ? 'block' : 'none';
        });

        sortMedicines();
    }

    function sortMedicines() {
        const sortBy = sortFilter.value;
        const medicineList = document.querySelector('.medicine-grid');
        const cards = Array.from(medicineCards);

        cards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;

            switch(sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name':
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });

        cards.forEach(card => medicineList.appendChild(card));
    }

    searchInput.addEventListener('input', filterMedicines);
    categoryFilter.addEventListener('change', filterMedicines);
    sortFilter.addEventListener('change', sortMedicines);

    // Category Card Click Handler
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            filterMedicines();
        });
    });

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = this.closest('.medicine-card');
            const img = card.querySelector('img');
            const cart = document.querySelector('.cart-icon');

            if (cart) {
                const imgClone = img.cloneNode();
                imgClone.style.position = 'fixed';
                imgClone.style.height = '50px';
                imgClone.style.width = '50px';
                imgClone.style.borderRadius = '50%';
                imgClone.style.zIndex = '1000';

                const startPos = img.getBoundingClientRect();
                const endPos = cart.getBoundingClientRect();

                imgClone.style.top = startPos.top + 'px';
                imgClone.style.left = startPos.left + 'px';

                document.body.appendChild(imgClone);

                imgClone.style.transition = 'all 0.8s ease-in-out';
                imgClone.style.top = endPos.top + 'px';
                imgClone.style.left = endPos.left + 'px';
                imgClone.style.transform = 'scale(0.1)';
                imgClone.style.opacity = '0';

                setTimeout(() => imgClone.remove(), 800);
            }
        });
    });
}); 