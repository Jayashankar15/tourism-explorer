// Jharkhand Tourism Platform - JavaScript

// District data
const districts = [
    { name: 'Ranchi', slug: 'ranchi', attractions: ['Rock Garden', 'Tagore Hill', 'Kanke Dam'], info: 'Capital city known for waterfalls and hills' },
    { name: 'Dhanbad', slug: 'dhanbad', attractions: ['Maithon Dam', 'Topchanchi Lake', 'Bhatinda Falls'], info: 'Coal capital with beautiful lakes and dams' },
    { name: 'Bokaro', slug: 'bokaro', attractions: ['Bokaro Steel City', 'Jawaharlal Nehru Biological Park', 'Garga Dam'], info: 'Industrial city with modern attractions' },
    { name: 'Hazaribagh', slug: 'hazaribagh', attractions: ['Hazaribagh National Park', 'Canary Hill', 'Konar Dam'], info: 'Famous for wildlife sanctuary and hill station' },
    { name: 'Giridih', slug: 'giridih', attractions: ['Parasnath Hill', 'Usri Falls', 'Khandoli Park'], info: 'Highest peak of Jharkhand and Jain pilgrimage' },
    { name: 'Palamu', slug: 'palamu', attractions: ['Betla National Park', 'Palamu Fort', 'Kamaldah Lake'], info: 'Tiger reserve and historical fort' },
    { name: 'Garhwa', slug: 'garhwa', attractions: ['Palamu Tiger Reserve', 'Kamaldah Lake', 'Kechki'], info: 'Part of Palamu division with rich wildlife' },
    { name: 'West Singhbhum', slug: 'singhbhum-west', attractions: ['Tata Steel Zoological Park', 'Dimna Lake', 'Jubilee Park'], info: 'Industrial hub with recreational spots' },
    { name: 'East Singhbhum', slug: 'singhbhum-east', attractions: ['Jamshedpur', 'Dalma Wildlife Sanctuary', 'Hudco Lake'], info: 'Steel city with modern amenities' },
    { name: 'Seraikela Kharsawan', slug: 'seraikela-kharsawan', attractions: ['Khandadhar Falls', 'Seraikela Palace', 'Kharsawan Palace'], info: 'Royal heritage and spectacular waterfalls' },
    { name: 'Deoghar', slug: 'deoghar', attractions: ['Baidyanath Temple', 'Trikut Hills', 'Tapovan'], info: 'Sacred pilgrimage site and spiritual center' },
    { name: 'Dumka', slug: 'dumka', attractions: ['Masanjore Dam', 'Maluti Temples', 'Bhagalpur'], info: 'Santhal Pargana headquarters with ancient temples' },
    { name: 'Godda', slug: 'godda', attractions: ['Shiva Ganga', 'Pathargama', 'Ganga River'], info: 'River town with religious significance' },
    { name: 'Sahebganj', slug: 'sahebganj', attractions: ['Rajmahal Hills', 'Udhwa Lake', 'Mandro Hill'], info: 'Historical town on the banks of Ganga' },
    { name: 'Pakur', slug: 'pakur', attractions: ['Pakur Hills', 'Littipara Lake', 'Santhal Culture'], info: 'Tribal culture and scenic hills' },
    { name: 'Chatra', slug: 'chatra', attractions: ['Bhadrakali Temple', 'Kolhua Lake', 'Hunterganj'], info: 'Religious sites and natural beauty' },
    { name: 'Koderma', slug: 'koderma', attractions: ['Tilaiya Dam', 'Koderma Wildlife Sanctuary', 'Jhumka'], info: 'Mica mines and scenic reservoirs' },
    { name: 'Gumla', slug: 'gumla', attractions: ['Nagfeni', 'Sita Falls', 'Angrabadi Temple'], info: 'Tribal areas with pristine waterfalls' },
    { name: 'Simdega', slug: 'simdega', attractions: ['Rihand Dam', 'Kolebira', 'Tribal Villages'], info: 'Tribal heritage and traditional crafts' },
    { name: 'Lohardaga', slug: 'lohardaga', attractions: ['Kauleshwari Temple', 'Cetri Lake', 'Tribal Museum'], info: 'Cultural heritage and tribal traditions' },
    { name: 'Khunti', slug: 'khunti', attractions: ['Birsa Munda Museum', 'Ulihatu', 'Tribal Heritage'], info: 'Birthplace of Birsa Munda' },
    { name: 'Ramgarh', slug: 'ramgarh', attractions: ['Ramgarh Hills', 'Patratu Valley', 'Coal Mines'], info: 'Coal mining area with scenic valleys' },
    { name: 'Latehar', slug: 'latehar', attractions: ['Netarhat', 'Lodh Falls', 'Betla Extension'], info: 'Hill station and waterfalls' },
    { name: 'Jamtara', slug: 'jamtara', attractions: ['Simultala Hill', 'Narayanpur', 'Mihijam'], info: 'Small district with natural beauty' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupHeroButtons();
    generateDistrictButtons();
    setupForms();
    setupModals();
    setupAnimations();
    setupSearch();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Setup hero section buttons
function setupHeroButtons() {
    const heroButtons = document.querySelectorAll('.cta-btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('Plan')) {
                document.getElementById('plans').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (button.textContent.includes('Explore')) {
                document.querySelector('.districts').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Generate district buttons dynamically
function generateDistrictButtons() {
    const districtsGrid = document.getElementById('districtsGrid');
    if (!districtsGrid) return;

    districts.forEach(district => {
        const button = document.createElement('button');
        button.className = 'district-btn';
        button.textContent = district.name;
        button.setAttribute('data-district', district.slug);
        
        button.addEventListener('click', () => {
            showDistrictModal(district);
        });

        districtsGrid.appendChild(button);
    });
}

// Modal functionality
function setupModals() {
    const modal = document.getElementById('districtModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show district modal with information
function showDistrictModal(district) {
    const modal = document.getElementById('districtModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <h3>${district.name} District</h3>
        <p>${district.info}</p>
        
        <div class="modal-attractions">
            <h4>Top Attractions</h4>
            ${district.attractions.map(attraction => 
                `<div class="attraction-item">
                    <strong>${attraction}</strong>
                    <p>A beautiful destination in ${district.name} district perfect for eco and cultural tourism.</p>
                </div>`
            ).join('')}
        </div>
        
        <div class="modal-buttons">
            <a href="districts/${district.slug}.html" class="modal-btn primary">Learn More</a>
            <button class="modal-btn secondary" onclick="planTripToDistrict('${district.slug}')">Plan Trip</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Plan trip to specific district
function planTripToDistrict(districtSlug) {
    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        districtSelect.value = districtSlug;
        document.getElementById('plans').scrollIntoView({
            behavior: 'smooth'
        });
        document.getElementById('districtModal').style.display = 'none';
    }
}

// Form handling
function setupForms() {
    setupTripPlanForm();
    setupReviewForm();
}

// Trip planning form
function setupTripPlanForm() {
    const form = document.getElementById('tripPlanForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const district = formData.get('district');
        const travelMode = formData.get('travelMode');
        const startDate = formData.get('startDate');
        const endDate = formData.get('endDate');

        if (!district || !startDate || !endDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Simulate loading
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = 'Finding Options... <span class="loading"></span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            redirectToBookingPlatform(travelMode, district);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Redirect to appropriate booking platform
function redirectToBookingPlatform(travelMode, district) {
    const destinations = {
        'ranchi': 'Ranchi',
        'dhanbad': 'Dhanbad',
        'bokaro': 'Bokaro',
        'jamshedpur': 'Jamshedpur'
    };

    const destination = destinations[district] || 'Jharkhand';

    switch(travelMode) {
        case 'bus':
            window.open(`https://www.redbus.in/search?fromCityName=Delhi&toCityName=${destination}`, '_blank');
            break;
        case 'train':
            window.open('https://www.irctc.co.in/', '_blank');
            break;
        case 'flight':
            window.open(`https://www.google.com/flights?q=flights%20to%20${destination}`, '_blank');
            break;
        default:
            alert('Please select a travel mode');
    }
}

// Review form handling
function setupReviewForm() {
    const form = document.getElementById('reviewForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const review = {
            name: formData.get('reviewName'),
            place: formData.get('reviewPlace'),
            rating: parseInt(formData.get('reviewRating')),
            text: formData.get('reviewText'),
            date: new Date().toLocaleDateString()
        };

        // Store review (in real app, this would be sent to server)
        storeReview(review);
        
        // Show success message
        showSuccessMessage('Thank you for sharing your experience!');
        
        // Reset form
        form.reset();
        
        // Update reviews display
        displayReviews();
    });
}

// Store review in memory (localStorage alternative)
let reviewsStorage = [];

function storeReview(review) {
    reviewsStorage.push(review);
}

function getReviews() {
    return reviewsStorage;
}

// Display reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    const reviews = getReviews();
    const allReviews = [
        ...reviews,
        {
            name: 'Priya Sharma',
            place: 'Netarhat',
            rating: 5,
            text: 'Amazing experience at Netarhat! The sunrise view was breathtaking. Highly recommend staying overnight to catch both sunset and sunrise.',
            date: '2024-12-15'
        },
        {
            name: 'Rahul Kumar',
            place: 'Betla National Park',
            rating: 4,
            text: 'Betla National Park safari was incredible. Saw elephants and various birds. Could improve the road conditions though.',
            date: '2024-12-10'
        }
    ];

    reviewsList.innerHTML = allReviews.slice(-5).map(review => `
        <div class="review-item">
            <div class="review-header">
                <strong>${review.name}</strong>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            </div>
            <p>"${review.text}"</p>
            <small>Visited: ${review.place}</small>
        </div>
    `).join('');
}

// Success message display
function showSuccessMessage(message) {
    // Create and show a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4a7c59, #7fb069);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1500;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Search and filter functionality
function setupSearch() {
    // This would be implemented for individual district pages
    // For now, we'll add the basic structure
}

// Animation setup
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// STEP 1: Find and remove ANY of these duplicate lines in your script.js:
// let reviewsStorage = [];
// const REVIEW_STORAGE_KEY = 'jh_reviews_v1';

// STEP 2: Replace the entire review section with this CLEAN version:

/* -----------------------------
   Review System - Clean Version
   ----------------------------- */

// Storage configuration
const REVIEW_STORAGE_KEY = 'jh_reviews_v1';
let reviewsStorage = []; // Memory fallback

// Safe storage functions
function loadReviewsFromStorage() {
  try {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('LocalStorage not available, using memory storage');
    return reviewsStorage;
  }
}

function saveReviewsToStorage(reviews) {
  try {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.warn('LocalStorage not available, saving to memory');
    reviewsStorage = reviews;
  }
}

// Review form setup
function setupReviewForm() {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameEl = document.getElementById('reviewName');
    const placeEl = document.getElementById('reviewPlace');
    const ratingEl = document.getElementById('reviewRating');
    const textEl = document.getElementById('reviewText');
    const photoEl = document.getElementById('reviewPhoto');

    const name = nameEl ? nameEl.value.trim() : '';
    const place = placeEl ? placeEl.value.trim() : '';
    const rating = ratingEl ? parseInt(ratingEl.value) || 5 : 5;
    const text = textEl ? textEl.value.trim() : '';

    if (!name || !place || !text) {
      alert('Please fill in your name, place visited and review text.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name,
      place,
      rating,
      text,
      date: new Date().toLocaleDateString('en-IN'),
      photo: null
    };

    if (photoEl && photoEl.files && photoEl.files[0]) {
      const file = photoEl.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        newReview.photo = reader.result;
        storeReview(newReview);
        showSuccessMessage('Thank you for sharing your experience!');
        form.reset();
        displayReviews();
      };
      reader.readAsDataURL(file);
    } else {
      storeReview(newReview);
      showSuccessMessage('Thank you for sharing your experience!');
      form.reset();
      displayReviews();
    }
  });

  displayReviews();
}

// Store review
function storeReview(review) {
  const reviews = loadReviewsFromStorage();
  reviews.push(review);
  saveReviewsToStorage(reviews);
}

// Get reviews
function getReviews() {
  return loadReviewsFromStorage();
}

// Display reviews
function displayReviews() {
  const reviewsList = document.getElementById('reviewsList');
  if (!reviewsList) return;

  const stored = loadReviewsFromStorage();
  const sampleReviews = [
    {
      id: 'sample-priya',
      name: 'Priya Sharma',
      place: 'Netarhat',
      rating: 5,
      text: 'Amazing experience at Netarhat! The sunrise view was breathtaking. Highly recommend staying overnight to catch both sunset and sunrise.',
      date: '2024-12-15',
      photo: null
    },
    {
      id: 'sample-rahul',
      name: 'Rahul Kumar',
      place: 'Betla National Park',
      rating: 4,
      text: 'Betla National Park safari was incredible. Saw elephants and various birds. Could improve the road conditions though.',
      date: '2024-12-10',
      photo: null
    }
  ];

  const all = [...stored, ...sampleReviews];
  const toShow = all.slice(-10).reverse();

  reviewsList.innerHTML = toShow.map(r => `
    <div class="review-item">
      <div class="review-header">
        <strong>${escapeHtml(r.name)}</strong>
        <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      </div>
      ${r.photo ? `<div class="review-photo-wrap"><img class="review-photo" src="${r.photo}" alt="photo by ${escapeHtml(r.name)}"></div>` : ''}
      <p>"${escapeHtml(r.text)}"</p>
      <small>Visited: ${escapeHtml(r.place)} • ${r.date}</small>
      ${isStoredReview(r.id) ? `<button class="delete-btn" data-id="${r.id}">Delete</button>` : ''}
    </div>
  `).join('');

  const deleteButtons = reviewsList.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      let reviews = loadReviewsFromStorage();
      reviews = reviews.filter(r => r.id !== id);
      saveReviewsToStorage(reviews);
      displayReviews();
    });
  });
}

// Helper functions
function isStoredReview(id) {
  const reviews = loadReviewsFromStorage();
  return reviews.some(r => r.id === id);
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    })[s];
  });
}

// Export functions for compatibility
window.JharkhandTourism = window.JharkhandTourism || {};
window.JharkhandTourism.storeReview = storeReview;
window.JharkhandTourism.getReviews = getReviews;
window.JharkhandTourism.displayReviews = displayReviews;

/* -----------------------------
   Safe Filter Initialization
   ----------------------------- */

document.addEventListener('DOMContentLoaded', function() {
  // Only initialize filters if elements exist
  const applyFiltersBtn = document.getElementById('applyFilters');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      const placeEl = document.getElementById('place');
      const budgetEl = document.getElementById('budget');
      
      const place = placeEl ? placeEl.value : '';
      const budget = budgetEl ? budgetEl.value : '';

      let url = 'hotels.html';
      const params = new URLSearchParams();
      if (place) params.append('place', place);
      if (budget) params.append('budget', budget);

      window.location.href = `${url}?${params.toString()}`;
    });
  }
});
}

// Filter redirect handler
function handleFilterRedirect() {
  const placeEl = document.getElementById('place');
  const budgetEl = document.getElementById('budget');
  
  const place = placeEl ? placeEl.value : '';
  const budget = budgetEl ? budgetEl.value : '';

  let url = 'hotels.html'; // default
  
  // You can add logic here to determine which page to redirect to
  const params = new URLSearchParams();
  if (place) params.append('place', place);
  if (budget) params.append('budget', budget);

  window.location.href = `${url}?${params.toString()}`;
}

// Hotel filters initialization
function initializeHotelFilters() {
  const searchEl = document.getElementById('hotelSearch');
  const placeFilterEl = document.getElementById('hotelPlaceFilter'); 
  const budgetFilterEl = document.getElementById('hotelBudgetFilter');

  if (searchEl) searchEl.addEventListener('input', filterHotels);
  if (placeFilterEl) placeFilterEl.addEventListener('change', filterHotels);
  if (budgetFilterEl) budgetFilterEl.addEventListener('change', filterHotels);
}

// Restaurant filters initialization  
function initializeRestaurantFilters() {
  const searchEl = document.getElementById('restaurantSearch');
  const placeFilterEl = document.getElementById('restaurantPlaceFilter');
  const budgetFilterEl = document.getElementById('restaurantBudgetFilter');

  if (searchEl) searchEl.addEventListener('input', filterRestaurants);
  if (placeFilterEl) placeFilterEl.addEventListener('change', filterRestaurants);
  if (budgetFilterEl) budgetFilterEl.addEventListener('change', filterRestaurants);
}

// Placeholder filter functions (define these based on your hotel/restaurant filtering logic)
function filterHotels() {
  console.log('Hotel filtering logic would go here');
  // This should be implemented in hotels.js
}

function filterRestaurants() {
  console.log('Restaurant filtering logic would go here'); 
  // This should be implemented in restaurants.js
}

