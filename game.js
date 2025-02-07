document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the game title from the query parameter
  const params = new URLSearchParams(window.location.search);
  const gameTitleParam = params.get('game');

  // Function to load games from JSON
  function loadGames() {
    return fetch('games.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      });
  }

  loadGames().then(games => {
    // Find and load the selected game into the iframe
    const selectedGame = games.find(game => game.title === gameTitleParam);
    if (selectedGame) {
      document.getElementById('gameIframe').src = selectedGame.embed;
    } else {
      console.error('Selected game not found.');
    }

    // Populate the sidebar with other games
    const sidebarList = document.getElementById('sidebarGameList');
    games.forEach(game => {
      if (game.title === gameTitleParam) return; // Skip current game
      const sidebarGame = document.createElement('div');
      sidebarGame.className = 'sidebar-game';
      sidebarGame.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;

      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;

      sidebarGame.appendChild(thumb);
      sidebarGame.appendChild(titleDiv);
      sidebarList.appendChild(sidebarGame);
    });
  }).catch(error => {
    console.error('Error loading games:', error);
  });

  // Fullscreen toggle for the game iframe
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  fullscreenBtn.addEventListener('click', () => {
    const iframe = document.getElementById('gameIframe');
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  });

  // Search functionality for the sidebar
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const sidebarGames = document.querySelectorAll('.sidebar-game');
    sidebarGames.forEach(item => {
      const title = item.querySelector('.sidebar-game-title').textContent.toLowerCase();
      if (title.indexOf(query) > -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

