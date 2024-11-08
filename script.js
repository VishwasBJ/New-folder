// RapidAPI Configuration
const rapidApiHeaders = {
    'x-rapidapi-key': '18cba466bemsh05889b43b444132p1faac9jsn61bb856eb865',
    'x-rapidapi-host': 'google-api31.p.rapidapi.com'
  };
  
  // Page Navigation
  function changePage(pageId) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
          page.classList.remove('active');
      });
  
      // Show selected page
      document.getElementById(pageId).classList.add('active');
  
      // Update navigation
      document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('active');
      });
      document.querySelector(`.nav-item[onclick="changePage('${pageId}')"]`)?.classList.add('active');
  
      // Update URL without page reload
      history.pushState(null, '', `#${pageId}`);
  }
  
  // Chatbot Toggle
  function toggleChatbot() {
      const dialog = document.getElementById('chatbot-dialog');
      dialog.classList.toggle('hidden');
  }
  
  // SOS Button
  document.getElementById('sos-button').addEventListener('click', function() {
      // In a real application, this would trigger emergency services
      alert('Emergency services have been notified. Help is on the way.');
  });
  
  // Chatbot Button
  document.getElementById('chatbot-button').addEventListener('click', toggleChatbot);
  
  // Handle Browser Back/Forward
  window.addEventListener('popstate', function() {
      const pageId = location.hash.slice(1) || 'home';
      changePage(pageId);
  });
  
  // Initialize page based on URL hash
  document.addEventListener('DOMContentLoaded', function() {
      const pageId = location.hash.slice(1) || 'home';
      changePage(pageId);
  });
  
  // Location Selector
  document.getElementById('location').addEventListener('change', function(e) {
      // In a real application, this would update content based on location
      console.log('Location changed to:', e.target.value);
  });
  
  // Example function to add a chatbot message
  function addChatbotMessage(message, isUser = false) {
      const messagesContainer = document.querySelector('.chatbot-messages');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Initialize chatbot with welcome message
  addChatbotMessage('Hello! How can I help you today?');
  
  // Handle chatbot input
  document.querySelector('.chatbot-input button').addEventListener('click', function() {
      const input = document.querySelector('.chatbot-input input');
      const message = input.value.trim();
      
      if (message) {
          addChatbotMessage(message, true);
          input.value = '';
          
          // Simulate bot response
          setTimeout(() => {
              addChatbotMessage('Thank you for your message. A healthcare assistant will respond shortly.');
          }, 1000);
      }
  });
  
  // Update the map initialization to use RapidAPI
  function initMap() {
      const bangalore = { lat: 12.9716, lng: 77.5946 };
      
      fetch('https://google-api31.p.rapidapi.com/maps/api/js', {
          method: 'GET',
          headers: rapidApiHeaders
      })
      .then(response => response.json())
      .then(data => {
          map = new google.maps.Map(document.getElementById('map'), {
              center: bangalore,
              zoom: 15
          });
          infowindow = new google.maps.InfoWindow();
      })
      .catch(err => {
          console.error('Error initializing map:', err);
      });
  }
  
  // Update the showNearestClinics function to use RapidAPI
  function showNearestClinics() {
      changePage('clinics');
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              const userLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              
              fetch('https://google-api31.p.rapidapi.com/maps/api/place/nearbysearch/json', {
                  method: 'POST',
                  headers: {
                      ...rapidApiHeaders,
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      location: userLocation,
                      radius: 5000,
                      type: 'hospital'
                  })
              })
              .then(response => response.json())
              .then(data => {
                  if (data.results) {
                      data.results.forEach(place => createMarker(place));
                  }
              })
              .catch(err => {
                  console.error('Error finding nearby clinics:', err);
                  alert('Error: Unable to find nearby clinics');
              });
          });
      } else {
          alert('Error: Your browser doesn\'t support geolocation.');
      }
  }
  
  // Placeholder for createMarker function (needs to be implemented)
  function createMarker(place) {
      //Implementation to create marker on map using place data.
      console.log("Marker data:", place);
  }