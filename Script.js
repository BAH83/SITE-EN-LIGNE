// Base de données des ebooks
const ebooks = [
    {
        id: 1,
        title: "La Dernière allumette",
        author: "Marie VAREILLE",
        category: "Romance",
        price: 2.99,
        originalPrice: 6.99,
        rating: 4.5,
        description: "Une histoire touchante sur l'espoir et la résilience...",
        pages: 320,
        words: 85000,
        readingTime: "6 heures",
        cover: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
        similar: [2, 3, 4]
    },
    {
        id: 2,
        title: "La dernière lumière",
        author: "Guillaume MUSSOLINI",
        category: "Thriller",
        price: 14.99,
        rating: 4.2,
        description: "Un thriller psychologique captivant...",
        pages: 450,
        words: 120000,
        readingTime: "8 heures",
        cover: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
        similar: [1, 3, 5]
    },
    {
        id: 3,
        title: "Le Crime du paradis",
        author: "Guillaume MUSSOLINI",
        category: "Policier",
        price: 14.99,
        rating: 4.0,
        description: "Une enquête palpitante dans les Caraïbes...",
        pages: 380,
        words: 95000,
        readingTime: "7 heures",
        cover: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
        similar: [2, 4, 6]
    },
    {
        id: 4,
        title: "La Révolte de la reine",
        author: "Morgane Moncomble",
        category: "Romance",
        price: 9.99,
        rating: 4.8,
        description: "Une romance historique passionnante...",
        pages: 420,
        words: 110000,
        readingTime: "7.5 heures",
        cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        similar: [1, 3, 5]
    },
    {
        id: 5,
        title: "La locataire",
        author: "Freida McFadden",
        category: "Thriller",
        price: 11.99,
        rating: 4.6,
        description: "Un thriller psychologique angoissant...",
        pages: 350,
        words: 90000,
        readingTime: "6.5 heures",
        cover: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        similar: [2, 3, 6]
    },
    {
        id: 6,
        title: "Les Morts ne chantent pas",
        author: "Jussi Adler-Olsen, Line Holm",
        category: "Policier",
        price: 15.99,
        rating: 4.3,
        description: "Une enquête du département V...",
        pages: 520,
        words: 140000,
        readingTime: "9 heures",
        cover: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
        similar: [2, 3, 5]
    }
];

// Catégories disponibles
const categories = [
    "Romance", "Thriller", "Policier", "Science-fiction", 
    "Fantasy", "Biographie", "Histoire", "Jeunesse"
];

// Avis des lecteurs
const reviews = [
    {
        id: 1,
        ebookId: 1,
        userName: "Sophie Martin",
        rating: 5,
        comment: "Magnifique histoire, j'ai adoré !",
        date: "2026-02-15"
    },
    {
        id: 2,
        ebookId: 1,
        userName: "Pierre Dubois",
        rating: 4,
        comment: "Très bon livre, bien écrit.",
        date: "2026-02-10"
    }
];

// Fonction pour afficher les catégories
function displayCategories() {
    const categoriesList = document.getElementById('categoriesList');
    if (!categoriesList) return;
    
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="categories.html?cat=${category}" class="category-link">${category}</a>`;
        categoriesList.appendChild(li);
    });
}

// Fonction pour afficher des livres aléatoires
function displayRandomBooks(count = 12) {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;
    
    const shuffled = [...ebooks].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    booksGrid.innerHTML = '';
    selected.forEach(book => {
        booksGrid.appendChild(createBookCard(book));
    });
}

// Fonction pour créer une carte de livre
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.onclick = () => window.location.href = `ebook.html?id=${book.id}`;
    
    const discount = book.originalPrice ? 
        `<span class="discount-badge">-${Math.round((1 - book.price/book.originalPrice)*100)}%</span>` : '';
    
    card.innerHTML = `
        <div class="book-cover" style="background: ${book.cover}">
            ${discount}
        </div>
        <div class="book-info">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-rating">
                ${getStarsHTML(book.rating)}
                <span>(${book.rating})</span>
            </div>
            <div class="book-price">
                ${book.originalPrice ? 
                    `<span style="text-decoration: line-through; color: #999;">${book.originalPrice} €</span>` : ''}
                ${book.price} €
            </div>
        </div>
    `;
    
    return card;
}

// Fonction pour générer les étoiles
function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

// Fonction de recherche
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.length < 2) return;
    
    const results = ebooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    
    // Rediriger vers la page de recherche
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// Fonction pour charger les détails d'un ebook
function loadEbookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const ebookId = parseInt(urlParams.get('id'));
    
    const ebook = ebooks.find(b => b.id === ebookId);
    if (!ebook) {
        window.location.href = 'index.html';
        return;
    }
    
    // Mettre à jour le breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <a href="index.html">Accueil</a> <span>/</span>
        <a href="categories.html?cat=${ebook.category}">${ebook.category}</a> <span>/</span>
        <span>${ebook.title}</span>
    `;
    
    // Mettre à jour les détails
    document.getElementById('detailCover').style.background = ebook.cover;
    document.getElementById('detailTitle').textContent = ebook.title;
    document.getElementById('detailAuthor').textContent = ebook.author;
    document.getElementById('detailDescription').textContent = ebook.description;
    
    // Prix
    document.getElementById('detailPrice').innerHTML = ebook.originalPrice ?
        `<span style="text-decoration: line-through; color: #999; font-size: 1rem;">${ebook.originalPrice} €</span> ${ebook.price} €` :
        `${ebook.price} €`;
    
    // Note
    document.getElementById('detailRating').innerHTML = `
        <div class="stars">${getStarsHTML(ebook.rating)}</div>
        <p>${ebook.rating} / 5 (${ebook.rating * 20} avis)</p>
    `;
    
    // Statistiques du livre
    document.getElementById('bookStats').innerHTML = `
        <div><i class="fas fa-book"></i> ${ebook.pages} pages</div>
        <div><i class="fas fa-clock"></i> ${ebook.readingTime}</div>
        <div><i class="fas fa-font"></i> ${ebook.words.toLocaleString()} mots</div>
    `;
    
    // Livres similaires
    displaySimilarBooks(ebook.similar);
    
    // Avis
    displayReviews(ebookId);
}

// Fonction pour afficher les livres similaires
function displaySimilarBooks(similarIds) {
    const similarGrid = document.getElementById('similarBooks');
    if (!similarGrid) return;
    
    similarGrid.innerHTML = '';
    similarIds.forEach(id => {
        const book = ebooks.find(b => b.id === id);
        if (book) {
            similarGrid.appendChild(createBookCard(book));
        }
    });
}

// Fonction pour afficher les avis
function displayReviews(ebookId) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const ebookReviews = reviews.filter(r => r.ebookId === ebookId);
    
    if (ebookReviews.length === 0) {
        reviewsList.innerHTML = '<p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>';
        return;
    }
    
    reviewsList.innerHTML = '';
    ebookReviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.userName}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-stars">${getStarsHTML(review.rating)}</div>
            <p class="review-comment">${review.comment}</p>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}

// Fonction pour le paiement
function processPayment(event) {
    event.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentPhone = document.getElementById('paymentPhone').value;
    
    // Récupérer les détails de la commande
    const urlParams = new URLSearchParams(window.location.search);
    const ebookId = parseInt(urlParams.get('id'));
    const ebook = ebooks.find(b => b.id === ebookId);
    
    // Simuler un paiement réussi
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('paymentSuccess').style.display = 'block';
    
    // Mettre à jour le lien WhatsApp
    const whatsappLink = document.querySelector('.whatsapp-btn');
    const message = `Bonjour, je viens d'effectuer un paiement de ${ebook.price}€ via ${paymentMethod} pour l'ebook "${ebook.title}". Mon numéro de transaction est ${Math.random().toString(36).substring(7)}`;
    whatsappLink.href = `https://wa.me/221XXXXXXXXX?text=${encodeURIComponent(message)}`;
    
    // Sauvegarder la commande
    const order = {
        id: Date.now(),
        nom,
        prenom,
        email,
        telephone,
        paymentMethod,
        paymentPhone,
        ebook: ebook,
        date: new Date().toISOString()
    };
    
    console.log('Commande enregistrée:', order);
}

// Fonction pour afficher le formulaire d'avis
function showReviewForm() {
    document.getElementById('reviewForm').style.display = 'block';
}

// Fonction pour soumettre un avis
function submitReview(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const ebookId = parseInt(urlParams.get('id'));
    
    const form = event.target;
    const rating = document.querySelectorAll('.stars-input i.fas').length;
    const userName = form.querySelector('input[type="text"]').value;
    const comment = form.querySelector('textarea').value;
    
    const newReview = {
        id: reviews.length + 1,
        ebookId: ebookId,
        userName: userName,
        rating: rating,
        comment: comment,
        date: new Date().toISOString().split('T')[0]
    };
    
    reviews.push(newReview);
    displayReviews(ebookId);
    form.reset();
    document.getElementById('reviewForm').style.display = 'none';
    
    alert('Merci pour votre avis !');
}

// Fonction pour définir la note
function setRating(rating) {
    const stars = document.querySelectorAll('.stars-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star';
        } else {
            star.className = 'far fa-star';
        }
    });
}

// Fonction pour rediriger vers le checkout
function goToCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const ebookId = urlParams.get('id');
    window.location.href = `checkout.html?id=${ebookId}`;
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour la recherche (touche Entrée)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBooks();
            }
        });
    }
});
// Fonction pour effectuer une recherche
function performSearch(query) {
    if (!query) {
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
        document.getElementById('resultsCount').textContent = '0 résultat';
        return;
    }
    
    // Filtrer les ebooks
    let results = ebooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Afficher les résultats
    displaySearchResults(results);
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
    const resultsGrid = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (results.length === 0) {
        resultsGrid.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = '0 résultat';
        return;
    }
    
    noResults.style.display = 'none';
    resultsCount.textContent = `${results.length} résultat${results.length > 1 ? 's' : ''}`;
    
    resultsGrid.innerHTML = '';
    results.forEach(book => {
        resultsGrid.appendChild(createBookCard(book));
    });
}

// Fonction pour trier les résultats
function sortResults() {
    const sortBy = document.getElementById('sortSelect').value;
    const query = document.getElementById('searchQuery').textContent;
    
    let results = ebooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    switch(sortBy) {
        case 'priceAsc':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
        case 'title':
            results.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Pertinence - garder l'ordre original
            break;
    }
    
    displaySearchResults(results);
}

// Fonction pour filtrer par prix
function filterResults() {
    const maxPrice = document.getElementById('priceFilter').value;
    document.getElementById('priceValue').textContent = maxPrice + ' €';
    
    const query = document.getElementById('searchQuery').textContent;
    
    let results = ebooks.filter(book => 
        (book.title.toLowerCase().includes(query.toLowerCase()) || 
         book.author.toLowerCase().includes(query.toLowerCase())) &&
        book.price <= maxPrice
    );
    
    displaySearchResults(results);
}

// Fonction pour charger les livres d'une catégorie
function loadCategoryBooks(category) {
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const categoryBooks = document.getElementById('categoryBooks');
    
    // Définir le titre et la description
    categoryTitle.textContent = category;
    
    const descriptions = {
        'Romance': 'Découvrez nos meilleures histoires d\'amour et romances passionnantes',
        'Thriller': 'Plongez dans des intrigues palpitantes et pleines de suspense',
        'Policier': 'Enquêtes, mystères et crimes à résoudre',
        'Science-fiction': 'Explorez des mondes futuristes et des univers parallèles',
        'Fantasy': 'Magie, créatures légendaires et aventures épiques',
        'Biographie': 'Découvrez la vie de personnages inspirants',
        'Histoire': 'Voyagez à travers les époques et les civilisations',
        'Jeunesse': 'Des livres adaptés aux jeunes lecteurs'
    };
    
    categoryDescription.textContent = descriptions[category] || `Tous nos livres dans la catégorie ${category}`;
    
    // Filtrer les livres
    const filteredBooks = ebooks.filter(book => book.category === category);
    
    if (filteredBooks.length === 0) {
        categoryBooks.innerHTML = '<p class="no-results">Aucun livre dans cette catégorie pour le moment</p>';
        document.getElementById('resultsCount').textContent = '0 livre';
        return;
    }
    
    document.getElementById('resultsCount').textContent = `${filteredBooks.length} livre${filteredBooks.length > 1 ? 's' : ''}`;
    
    // Afficher les livres
    categoryBooks.innerHTML = '';
    filteredBooks.forEach(book => {
        categoryBooks.appendChild(createBookCard(book));
    });
}

// Fonction pour trier les livres de la catégorie
function sortCategoryBooks() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'Tous';
    const sortBy = document.getElementById('sortSelect').value;
    
    let filteredBooks = ebooks.filter(book => book.category === category);
    
    switch(sortBy) {
        case 'new':
            // Simuler les nouveautés (par ID pour cet exemple)
            filteredBooks.sort((a, b) => b.id - a.id);
            break;
        case 'priceAsc':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Populaire - par note
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayCategoryBooks(filteredBooks);
}

// Fonction pour filtrer les livres de la catégorie
function filterCategoryBooks() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'Tous';
    const priceRange = document.getElementById('priceRange').value;
    const minRating = parseFloat(document.getElementById('ratingFilter').value);
    
    let filteredBooks = ebooks.filter(book => book.category === category);
    
    // Filtrer par prix
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange === '20+') {
            filteredBooks = filteredBooks.filter(book => book.price >= 20);
        } else {
            filteredBooks = filteredBooks.filter(book => book.price >= min && book.price <= max);
        }
    }
    
    // Filtrer par note
    if (minRating > 0) {
        filteredBooks = filteredBooks.filter(book => book.rating >= minRating);
    }
    
    displayCategoryBooks(filteredBooks);
    document.getElementById('resultsCount').textContent = `${filteredBooks.length} livre${filteredBooks.length > 1 ? 's' : ''}`;
}

// Fonction pour afficher les livres de la catégorie
function displayCategoryBooks(books) {
    const categoryBooks = document.getElementById('categoryBooks');
    categoryBooks.innerHTML = '';
    books.forEach(book => {
        categoryBooks.appendChild(createBookCard(book));
    });
}

// Fonction pour afficher les catégories populaires
function displayPopularCategories() {
    const popularGrid = document.getElementById('popularCategories');
    if (!popularGrid) return;
    
    const popularCats = ['Romance', 'Thriller', 'Policier', 'Science-fiction', 'Fantasy'];
    
    popularGrid.innerHTML = '';
    popularCats.forEach(cat => {
        const count = ebooks.filter(book => book.category === cat).length;
        
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => window.location.href = `categories.html?cat=${cat}`;
        
        // Icône différente selon la catégorie
        let icon = 'fa-book';
        if (cat === 'Romance') icon = 'fa-heart';
        else if (cat === 'Thriller') icon = 'fa-skull';
        else if (cat === 'Policier') icon = 'fa-gavel';
        else if (cat === 'Science-fiction') icon = 'fa-rocket';
        else if (cat === 'Fantasy') icon = 'fa-dragon';
        
        card.innerHTML = `
            <i class="fas ${icon}"></i>
            <h3>${cat}</h3>
            <p>${count} livre${count > 1 ? 's' : ''}</p>
        `;
        
        popularGrid.appendChild(card);
    });
}

// Fonction pour la pagination
function setupPagination(totalItems, itemsPerPage, currentPage) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    pagination.innerHTML = buttons;
}

// Fonction pour aller à une page
function goToPage(page) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', page);
    window.location.search = urlParams.toString();
}

// Sauvegarder les données dans localStorage pour la démo
function saveDemoData() {
    localStorage.setItem('ebooks', JSON.stringify(ebooks));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Charger les données depuis localStorage
function loadDemoData() {
    const savedEbooks = localStorage.getItem('ebooks');
    const savedCategories = localStorage.getItem('categories');
    const savedReviews = localStorage.getItem('reviews');
    
    if (savedEbooks) Object.assign(ebooks, JSON.parse(savedEbooks));
    if (savedCategories) Object.assign(categories, JSON.parse(savedCategories));
    if (savedReviews) Object.assign(reviews, JSON.parse(savedReviews));
}

// Initialiser la démo
saveDemoData();