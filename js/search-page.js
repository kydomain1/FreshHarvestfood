// Search Page JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        if (nav) {
            nav.classList.toggle('active');
        }
    });
}

// All articles data
const articles = [
    {
        id: 1,
        title: "Summer Fashion Trends 2025: Sustainable Style Guide",
        excerpt: "Discover the hottest sustainable fashion trends that will dominate this summer, from eco-friendly fabrics to timeless accessories that make a statement.",
        category: "fashion",
        categoryName: "Fashion & Accessories",
        date: "2025-01-15",
        dateFormatted: "January 15, 2025",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop",
        url: "article1.html"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Natural Skincare Routines",
        excerpt: "Transform your skin with our comprehensive guide to natural skincare. Learn about the best organic products and create a personalized routine that works.",
        category: "beauty",
        categoryName: "Health & Beauty",
        date: "2025-03-20",
        dateFormatted: "March 20, 2025",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop",
        url: "article2.html"
    },
    {
        id: 3,
        title: "Creating Your Dream Indoor Garden: A Beginner's Journey",
        excerpt: "Bring nature indoors with our complete guide to creating and maintaining a thriving indoor garden, perfect for apartment living and small spaces.",
        category: "home",
        categoryName: "Home & Garden",
        date: "2025-05-10",
        dateFormatted: "May 10, 2025",
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=500&fit=crop",
        url: "article3.html"
    },
    {
        id: 4,
        title: "Top 10 Boutique Hotels for Your Next Getaway",
        excerpt: "Explore our curated selection of charming boutique hotels that offer unique experiences, exceptional service, and unforgettable memories.",
        category: "travel",
        categoryName: "Travel & Accommodation",
        date: "2025-06-25",
        dateFormatted: "June 25, 2025",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
        url: "article4.html"
    },
    {
        id: 5,
        title: "Superfood Smoothie Bowls: Delicious & Nutritious Recipes",
        excerpt: "Kickstart your mornings with these vibrant, nutrient-packed smoothie bowl recipes. Complete with topping ideas and health benefits breakdown.",
        category: "food",
        categoryName: "Food & Beverage",
        date: "2025-08-12",
        dateFormatted: "August 12, 2025",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop",
        url: "article5.html"
    }
];

// Get search parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('q') || '';
let activeCategory = 'all';
let currentSort = 'relevance';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Search page loaded'); // Debug log
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const sortSelect = document.getElementById('sortSelect');

    // Set initial search value
    if (searchQuery) {
        searchInput.value = searchQuery;
        document.getElementById('searchQuery').textContent = `Results for "${searchQuery}"`;
    } else {
        document.getElementById('searchQuery').textContent = 'All Articles';
    }

    // Perform initial search
    console.log('Performing initial search...'); // Debug log
    performSearch();

    // Search button click
    searchButton.addEventListener('click', function() {
        updateSearchResults();
    });

    // Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateSearchResults();
        }
    });

    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            performSearch();
        });
    });

    // Sort select
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        performSearch();
    });
});

function updateSearchResults() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    // Update URL without reloading
    const newUrl = query ? `search.html?q=${encodeURIComponent(query)}` : 'search.html';
    window.history.pushState({}, '', newUrl);
    
    // Update header
    document.getElementById('searchQuery').textContent = query ? `Results for "${query}"` : 'All Articles';
    
    performSearch();
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    // Filter articles
    let results = articles.filter(article => {
        // Category filter
        if (activeCategory !== 'all' && article.category !== activeCategory) {
            return false;
        }
        
        // Search query filter
        if (query) {
            const searchText = `${article.title} ${article.excerpt} ${article.categoryName}`.toLowerCase();
            return searchText.includes(query);
        }
        
        return true;
    });

    // Sort results
    results = sortResults(results, currentSort, query);

    // Display results
    displayResults(results, query);
}

function sortResults(results, sortType, query) {
    switch(sortType) {
        case 'date-desc':
            return results.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        case 'date-asc':
            return results.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        case 'title':
            return results.sort((a, b) => a.title.localeCompare(b.title));
        
        case 'relevance':
        default:
            // If there's a query, sort by relevance (title matches first)
            if (query) {
                return results.sort((a, b) => {
                    const aTitle = a.title.toLowerCase().includes(query);
                    const bTitle = b.title.toLowerCase().includes(query);
                    if (aTitle && !bTitle) return -1;
                    if (!aTitle && bTitle) return 1;
                    return 0;
                });
            }
            // Otherwise, sort by date (newest first)
            return results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

function displayResults(results, query) {
    console.log('Displaying results:', results.length); // Debug log
    
    const resultsContainer = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    if (!resultsContainer) {
        console.error('Results container not found!');
        return;
    }

    // Update results count
    if (query) {
        resultsCount.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
    } else {
        resultsCount.textContent = `Showing ${results.length} article${results.length !== 1 ? 's' : ''}`;
    }

    if (results.length === 0) {
        // Show no results message
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        // Show results
        resultsContainer.style.display = 'grid';
        noResults.style.display = 'none';
        
        // Generate HTML for results
        resultsContainer.innerHTML = results.map(article => `
            <article class="article-card" data-category="${article.category}">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-content">
                    <span class="article-category">${article.categoryName}</span>
                    <h2 class="article-title">${highlightText(article.title, query)}</h2>
                    <p class="article-excerpt">${highlightText(article.excerpt, query)}</p>
                    <div class="article-meta">
                        <span class="article-date">${article.dateFormatted}</span>
                        <a href="${article.url}" class="read-more">Read More →</a>
                    </div>
                </div>
            </article>
        `).join('');

        // Add animation to cards
        const cards = resultsContainer.querySelectorAll('.article-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
        });
    }
}

function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Add CSS for highlighting
const style = document.createElement('style');
style.textContent = `
    mark {
        background: linear-gradient(120deg, #E8B4B8 0%, #E8B4B8 100%);
        background-repeat: no-repeat;
        background-size: 100% 40%;
        background-position: 0 85%;
        color: inherit;
        padding: 0;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

