document.addEventListener('DOMContentLoaded', () => {
  // Parse query parameters (e.g. ?game=Ragdoll%20Hit%20Stickman)
  const params = new URLSearchParams(window.location.search);
  const gameTitle = params.get('game'); // The selected game's title

  // Select DOM elements
  const gameIframe = document.getElementById('gameIframe');
  const sidebarContainer = document.getElementById('sidebarGames');
  const modalSearch = document.getElementById('modalSearch');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  let gamesData = [];
  let ratingGiven = false;

  // Debug log to ensure script loaded
  console.log('game.js loaded, selected game =', gameTitle);

  // Fetch games from games.json
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      // Find the selected game by title
      const selectedGame = gamesData.find(game => game.title === gameTitle);
      if (selectedGame) {
        console.log('Selected game found:', selectedGame);
        gameIframe.src = selectedGame.embed;
      } else {
        console.error('Selected game not found:', gameTitle);
        gameIframe.src = '';
      }
      // Populate the recommended sidebar
      populateSidebar(selectedGame);
    })
    .catch(error => console.error('Error loading games:', error));

  // Populate recommended games (excluding the current one)
  function populateSidebar(selectedGame) {
    sidebarContainer.innerHTML = '';
    gamesData.forEach(game => {
      // Skip the current game
      if (selectedGame && game.title === selectedGame.title) return;

      // Create the sidebar card
      const card = document.createElement('div');
      card.className = 'sidebar-game';
      card.addEventListener('click', () => {
        // Navigate to the same page with a different ?game= param
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      card.appendChild(titleDiv);

      sidebarContainer.appendChild(card);
    });
  }

  // Fullscreen toggle
  fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
      gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
      gameIframe.msRequestFullscreen();
    }
  });

  // One-time Like/Dislike
  likeBtn.addEventListener('click', () => {
    if (!ratingGiven) {
      ratingGiven = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      likeBtn.classList.add('selected');
      console.log('Liked game:', gameTitle);
      // Optionally send data to your server
    }
  });

  dislikeBtn.addEventListener('click', () => {
    if (!ratingGiven) {
      ratingGiven = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      dislikeBtn.classList.add('selected');
      console.log('Disliked game:', gameTitle);
      // Optionally send data to your server
    }
  });

  // Search filtering for recommended games
  modalSearch.addEventListener('input', () => {
    const query = modalSearch.value.toLowerCase();
    sidebarContainer.innerHTML = '';
    const filtered = gamesData.filter(game =>
      (game.title.toLowerCase().includes(query) ||
       game.tags.toLowerCase().includes(query) ||
       game.description.toLowerCase().includes(query)) &&
      game.title !== gameTitle
    );
    filtered.forEach(game => {
      const card = document.createElement('div');
      card.className = 'sidebar-game';
      card.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      card.appendChild(titleDiv);

      sidebarContainer.appendChild(card);
    });
  });
});
