const hotels = [
    {
        name: "Radisson Blu Hotel Ranchi",
        location: "Ranchi",
        description: "A luxurious 5-star hotel offering modern amenities and exceptional service.",
        price: "₹10,900 per night",
        image: "https://www.radissonhotels.com/en-us/destination/india/ranchi",
        website: "https://www.radissonhotels.com/en-us/destination/india/ranchi"
    },
    {
        name: "The Royal Retreat",
        location: "Ranchi",
        description: "A heritage hotel providing a royal experience with contemporary comforts.",
        price: "₹3,056 per night",
        image: "https://www.makemytrip.com/hotels/the_royal_retreat-details-ranchi.html",
        website: "https://www.makemytrip.com/hotels/the_royal_retreat-details-ranchi.html"
    },
    {
        name: "Parklane Resort",
        location: "Dhanbad",
        description: "A serene resort offering a perfect blend of nature and luxury.",
        price: "₹3,500 per night",
        image: "https://www.makemytrip.com/hotels/parklane_resort-details-dhanbad.html",
        website: "https://www.makemytrip.com/hotels/parklane_resort-details-dhanbad.html"
    },
    {
        name: "Fortune Hotel Centre Point",
        location: "Jamshedpur",
        description: "A premium hotel known for its excellent hospitality and facilities.",
        price: "₹5,000 per night",
        image: "https://www.ashextourism.com/hotelsresorts/Jharkhand/Fortunehotelcentrepoint.htm",
        website: "https://www.ashextourism.com/hotelsresorts/Jharkhand/Fortunehotelcentrepoint.htm"
    },
    {
        name: "Lemon Tree Hotel",
        location: "Jamshedpur",
        description: "A vibrant hotel offering stylish rooms and a range of amenities.",
        price: "₹4,152 per night",
        image: "https://www.lemontreehotels.com/jamshedpur-hotels",
        website: "https://www.lemontreehotels.com/jamshedpur-hotels"
    },
    {
        name: "Hotel Pinnacle",
        location: "Ranchi",
        description: "A contemporary hotel offering comfortable accommodations with modern amenities.",
        price: "₹2,500 per night",
        image: "https://www.ranchijharkhand.com/ranchi-jharkhand-hotels/",
        website: "https://www.ranchijharkhand.com/ranchi-jharkhand-hotels/"
    },
    {
        name: "Hotel Marina Inn",
        location: "Dhanbad",
        description: "A budget-friendly hotel providing essential services for travelers.",
        price: "₹1,249 per night",
        image: "https://www.makemytrip.com/hotels/hotel_marina_inn-details-dhanbad.html",
        website: "https://www.makemytrip.com/hotels/hotel_marina_inn-details-dhanbad.html"
    },
    {
        name: "Hotel Grand Residency",
        location: "Jamshedpur",
        description: "A mid-range hotel offering spacious rooms and conference facilities.",
        price: "₹3,000 per night",
        image: "https://www.booking.com/hotel/in/grand-residency-jamshedpur12.html",
        website: "https://www.booking.com/hotel/in/grand-residency-jamshedpur12.html"
    },
    {
        name: "Hotel VIP Regency",
        location: "Dhanbad",
        description: "A 3-star hotel known for its elegant interiors and quality service.",
        price: "₹4,500 per night",
        image: "https://www.expedia.com/Dhanbad-Hotels.d6817.Travel-Guide-Hotels",
        website: "https://www.expedia.com/Dhanbad-Hotels.d6817.Travel-Guide-Hotels"
    },
    {
        name: "Hotel Arham Inn",
        location: "Ranchi",
        description: "A budget hotel offering clean and comfortable rooms for short stays.",
        price: "₹1,200 per night",
        image: "https://www.expedia.com/Ranchi-Hotels.d1659.Travel-Guide-Hotels",
        website: "https://www.expedia.com/Ranchi-Hotels.d1659.Travel-Guide-Hotels"
    }
];

function renderHotels() {
    const grid = document.getElementById('hotelsGrid');
    grid.innerHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p><strong>Location:</strong> ${hotel.location}</p>
                <p><strong>Description:</strong> ${hotel.description}</p>
                <p><strong>Price:</strong> ${hotel.price}</p>
                <a href="${hotel.website}" target="_blank">Book Now</a>
            </div>
        </div>
    `).join('');
}

renderHotels();
function renderHotels(filteredHotels = hotels) {
  const grid = document.getElementById('hotelsGrid');
  grid.innerHTML = filteredHotels.map(hotel => `
      <div class="hotel-card">
          <img src="${hotel.image}" alt="${hotel.name}">
          <div class="hotel-info">
              <h3>${hotel.name}</h3>
              <p><strong>Location:</strong> ${hotel.location}</p>
              <p><strong>Description:</strong> ${hotel.description}</p>
              <p><strong>Price:</strong> ${hotel.price}</p>
              <a href="${hotel.website}" target="_blank">Book Now</a>
          </div>
      </div>
  `).join('');
}

function filterHotels() {
  const search = document.getElementById('hotelSearch').value.toLowerCase();
  const place = document.getElementById('hotelPlaceFilter').value;
  const budget = document.getElementById('hotelBudgetFilter').value;

  let filtered = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(search) ||
    hotel.location.toLowerCase().includes(search)
  );

  if (place) {
    filtered = filtered.filter(hotel => hotel.location === place);
  }

  if (budget) {
    filtered = filtered.filter(hotel => {
      const priceNum = parseInt(hotel.price.replace(/[^\d]/g, '')) || 0;
      if (budget === 'low') return priceNum < 2000;
      if (budget === 'mid') return priceNum >= 2000 && priceNum <= 5000;
      if (budget === 'high') return priceNum > 5000;
    });
  }

  renderHotels(filtered);
}

// Event listeners
document.getElementById('hotelSearch').addEventListener('input', filterHotels);
document.getElementById('hotelPlaceFilter').addEventListener('change', filterHotels);
document.getElementById('hotelBudgetFilter').addEventListener('change', filterHotels);

// Initial render
renderHotels();
