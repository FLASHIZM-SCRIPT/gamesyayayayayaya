document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const gameModal = document.getElementById('gameModal');
  const gameIframe = document.getElementById('gameIframe');
  const closeBtn = document.querySelector('.modal .close');

  // Fetch games from games.json
  fetch('games.json')
    .then(response => response.json())
    .then(games => {
      displayGames(games);
    })
    .catch(error => console.error('Error loading games:', error));

  // Function to create and display game cards
  function displayGames(games) {
    gameContainer.innerHTML = ''; // Clear existing content
    games.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');
      
      // Create image element for the card
      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      // Create title element at the bottom of the card
      const title = document.createElement('div');
      title.classList.add('game-title');
      title.textContent = game.title;
      card.appendChild(title);

      // Add click event: open modal and load the embed in the iframe
      card.addEventListener('click', () => {
        gameIframe.src = game.embed;
        gameModal.style.display = 'block';
      });

      gameContainer.appendChild(card);
    });
  }

  // Close modal when close button is clicked
  closeBtn.addEventListener('click', () => {
    gameModal.style.display = 'none';
    gameIframe.src = ''; // Clear iframe to stop game playback
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === gameModal) {
      gameModal.style.display = 'none';
      gameIframe.src = '';
    }
  });
});

