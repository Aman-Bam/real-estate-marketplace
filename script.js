// Shared JavaScript for Real Estate Marketplace

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize search functionality
  initSearch();

  // Initialize filters
  initFilters();

  // Initialize modals
  initModals();

  // Load properties if on listings page
  if (document.getElementById('property-list')) {
    loadProperties();
  }

  // Load property details if on details page
  if (document.getElementById('property-details')) {
    loadPropertyDetails();
  }
});

// Search functionality
function initSearch() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = document.getElementById('search-input').value;
      // Redirect to listings page with search query
      window.location.href = `listings.html?search=${encodeURIComponent(query)}`;
    });
  }
}

// Filters functionality
function initFilters() {
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const filters = {
        location: document.getElementById('location-filter').value,
        minPrice: document.getElementById('min-price').value,
        maxPrice: document.getElementById('max-price').value,
        bedrooms: document.getElementById('bedrooms-filter').value,
        type: document.getElementById('type-filter').value
      };
      loadProperties(filters);
    });
  }
}

// Load properties for listings page
function loadProperties(filters = {}) {
  const propertyList = document.getElementById('property-list');
  if (!propertyList) return;

  let filteredProperties = properties;

  // Apply URL search query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery) {
    filteredProperties = filteredProperties.filter(property =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply filters
  filteredProperties = filterProperties(filters);

  // Render properties
  propertyList.innerHTML = '';
  filteredProperties.forEach(property => {
    const propertyCard = createPropertyCard(property);
    propertyList.appendChild(propertyCard);
  });
}

// Create property card element
function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card bg-white rounded-lg shadow-md overflow-hidden fade-in';
  card.innerHTML = `
    <img src="${property.images[0]}" alt="${property.title}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-navy mb-2">${property.title}</h3>
      <p class="text-gray-600 mb-2">${property.location}</p>
      <p class="text-2xl font-bold text-gold mb-2">$${property.price.toLocaleString()}</p>
      <div class="flex justify-between text-sm text-gray-500 mb-4">
        <span>${property.bedrooms} beds</span>
        <span>${property.bathrooms} baths</span>
        <span>${property.sqft} sqft</span>
      </div>
      <a href="property-details.html?id=${property.id}" class="btn-primary inline-block px-4 py-2 rounded text-white">View Details</a>
    </div>
  `;
  return card;
}

// Load property details
function loadPropertyDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');
  const property = getPropertyById(propertyId);

  if (property) {
    document.getElementById('property-title').textContent = property.title;
    document.getElementById('property-price').textContent = `$${property.price.toLocaleString()}`;
    document.getElementById('property-location').textContent = property.location;
    document.getElementById('property-details').innerHTML = `
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
      <p><strong>Square Feet:</strong> ${property.sqft}</p>
      <p><strong>Type:</strong> ${property.type}</p>
      <p><strong>Description:</strong> ${property.description}</p>
      <p><strong>Features:</strong> ${property.features.join(', ')}</p>
      <p><strong>Agent:</strong> ${property.agent}</p>
    `;

    // Load gallery
    const gallery = document.getElementById('property-gallery');
    gallery.innerHTML = '';
    property.images.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      img.alt = property.title;
      img.className = 'w-full h-64 object-cover rounded';
      gallery.appendChild(img);
    });

    // Load similar properties
    loadSimilarProperties(property);
  }
}

// Load similar properties
function loadSimilarProperties(currentProperty) {
  const similarList = document.getElementById('similar-properties');
  if (!similarList) return;

  const similar = properties.filter(p => p.id !== currentProperty.id && p.type === currentProperty.type).slice(0, 3);
  similarList.innerHTML = '';
  similar.forEach(property => {
    const card = createPropertyCard(property);
    card.className = 'property-card bg-white rounded-lg shadow-md overflow-hidden fade-in w-full md:w-1/3';
    similarList.appendChild(card);
  });
}

// Modal functionality
function initModals() {
  const modals = document.querySelectorAll('.modal');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'block';
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}

// Mortgage calculator (simple)
function calculateMortgage() {
  const price = parseFloat(document.getElementById('calc-price').value);
  const downPayment = parseFloat(document.getElementById('calc-down').value);
  const interestRate = parseFloat(document.getElementById('calc-rate').value) / 100 / 12;
  const term = parseFloat(document.getElementById('calc-term').value) * 12;

  const loanAmount = price - downPayment;
  const monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, term)) / (Math.pow(1 + interestRate, term) - 1);

  document.getElementById('monthly-payment').textContent = `$${monthlyPayment.toFixed(2)}`;
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}
