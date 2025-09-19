const restaurants = [
    {
        name: "Moti Mahal Delux Tandoori Trail",
        location: "Ranchi",
        cuisine: "North Indian, Chinese, Biryani",
        price: "₹1,000 for two",
        image: "moti-mahal-delux.jpg",
        website: "https://www.zomato.com/ranchi/moti-mahal-delux-tandoori-trail-kadru"
    },
    {
        name: "The Ruin House",
        location: "Ranchi",
        cuisine: "Indian, Chinese, Mughlai",
        price: "₹1,000 for two",
        image: "respics/res2.jpg",
        website: "https://www.zomato.com/ranchi/the-ruin-house-2-morabadi"
    },
    {
        name: "AL-BAIK",
        location: "Bokaro Steel City",
        cuisine: "Fast Food, Middle Eastern",
        price: "₹400 for two",
        image: "respics/res3.jpg",
        website: "https://www.al-baik.com/restaurants/jharkhand/bokaro-steel-city/bokaro"
    },
    {
        name: "The Kav's Restaurant",
        location: "Ranchi",
        cuisine: "Indian, Continental",
        price: "₹550 for two",
        image: "respics/res4.jpg",
        website: "https://www.zomato.com/ranchi/the-kavs-harmu"
    },
    {
        name: "Kaveri Restaurant",
        location: "Ranchi",
        cuisine: "South Indian, North Indian, Pizza, Street Food, Fast Food, Chinese, Desserts, Beverages",
        price: "₹500 for two",
        image: "respics/res5.jpg",
        website: "https://www.zomato.com/ranchi/kaveri-restaurant-church-complex"
    },
    {
        name: "Seasons Restaurant",
        location: "Ranchi",
        cuisine: "North Indian, Chinese",
        price: "₹700 for two",
        image: "respics/res6.jpg",
        website: "https://www.zomato.com/ranchi/seasons-restaurant-lalpur"
    },
    {
        name: "Soros",
        location: "Ranchi",
        cuisine: "North Indian, Chinese",
        price: "₹800 for two",
        image: "respics/res7.jpg",
        website: "https://www.zomato.com/ranchi/soros"
    },
    {
        name: "Angithi Restaurant",
        location: "Ranchi",
        cuisine: "North Indian, Mughlai",
        price: "₹600 for two",
        image: "respics/res8.jpg",
        website: "https://www.zomato.com/ranchi/angithi-restaurant"
    },
    {
        name: "The Oriental Kitchen",
        location: "Ranchi",
        cuisine: "Chinese, Thai, Asian",
        price: "₹700 for two",
        image: "respics/res9.jpg",
        website: "https://www.zomato.com/ranchi/the-oriental-kitchen"
    },
    {
        name: "Bahamas Fusion Kitchen",
        location: "Dhanbad",
        cuisine: "Multi-Cuisine",
        price: "₹1,200 for two",
        image: "respics/res10.jpg",
        website: "https://www.zomato.com/dhanbad/bahamas-fusion-kitchen"
    }
];

function renderRestaurants() {
    const grid = document.getElementById('restaurantsGrid');
    grid.innerHTML = restaurants.map(rest => `
        <div class="restaurant-card">
            <img src="${rest.image}" alt="${rest.name}">
            <div class="restaurant-info">
                <h3>${rest.name}</h3>
                <p><strong>Location:</strong> ${rest.location}</p>
                <p><strong>Cuisine:</strong> ${rest.cuisine}</p>
                <p><strong>Price:</strong> ${rest.price}</p>
                <a href="${rest.website}" target="_blank">Book / Visit</a>
            </div>
        </div>
    `).join('');
}

renderRestaurants();
function renderRestaurants(filteredRestaurants = restaurants) {
  const grid = document.getElementById('restaurantsGrid');
  grid.innerHTML = filteredRestaurants.map(rest => `
      <div class="restaurant-card">
          <img src="${rest.image}" alt="${rest.name}">
          <div class="restaurant-info">
              <h3>${rest.name}</h3>
              <p><strong>Location:</strong> ${rest.location}</p>
              <p><strong>Cuisine:</strong> ${rest.cuisine}</p>
              <p><strong>Price:</strong> ${rest.price}</p>
              <a href="${rest.website}" target="_blank">Book / Visit</a>
          </div>
      </div>
  `).join('');
}

function filterRestaurants() {
  const search = document.getElementById('restaurantSearch').value.toLowerCase();
  const place = document.getElementById('restaurantPlaceFilter').value;
  const budget = document.getElementById('restaurantBudgetFilter').value;

  let filtered = restaurants.filter(rest => 
    rest.name.toLowerCase().includes(search) ||
    rest.location.toLowerCase().includes(search) ||
    rest.cuisine.toLowerCase().includes(search)
  );

  if (place) {
    filtered = filtered.filter(rest => rest.location === place);
  }

  if (budget) {
    filtered = filtered.filter(rest => {
      const priceNum = parseInt(rest.price.replace(/[^\d]/g, '')) || 0;
      if (budget === 'low') return priceNum < 500;
      if (budget === 'mid') return priceNum >= 500 && priceNum <= 1000;
      if (budget === 'high') return priceNum > 1000;
    });
  }

  renderRestaurants(filtered);
}

// Event listeners
document.getElementById('restaurantSearch').addEventListener('input', filterRestaurants);
document.getElementById('restaurantPlaceFilter').addEventListener('change', filterRestaurants);
document.getElementById('restaurantBudgetFilter').addEventListener('change', filterRestaurants);

// Initial render
renderRestaurants();
