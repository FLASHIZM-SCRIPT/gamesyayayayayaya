document.addEventListener('DOMContentLoaded', () => {
  // Read the selected game title from the query parameter
  const params = new URLSearchParams(window.location.search);
  const gameTitle = params.get('game');

  const gameIframe = document.getElementById('gameIframe');
  const sidebarContainer = document.getElementById('sidebarGames');
  const modalSearch = document.getElementById('modalSearch');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  let gamesData = [];

  // Fetch games.json data
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      // Find and load the selected game embed
      const selectedGame = gamesData.find(game => game.title === gameTitle);
      if (selectedGame) {
        gameIframe.src = selectedGame.embed;
      } else {
        console.error('Selected game not found:', gameTitle);
        gameIframe.src = "";
      }
      // Populate the recommended sidebar
      populateSidebar(selectedGame);
    })
    .catch(error => console.error('Error fetching games:', error));

  // Function to populate recommended games (excluding the currently selected game)
  function populateSidebar(selectedGame) {
    sidebarContainer.innerHTML = '';
    gamesData.forEach(game => {
      if (selectedGame && game.title === selectedGame.title) return; // skip current game
      const sidebarGame = document.createElement('div');
      sidebarGame.className = 'sidebar-game';
      sidebarGame.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarGame.appendChild(thumb);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      sidebarGame.appendChild(titleDiv);

      sidebarContainer.appendChild(sidebarGame);
    });
  }

  // Fullscreen functionality for the game iframe
  fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
      gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
      gameIframe.msRequestFullscreen();
    }
  });

  // Sidebar search functionality: filter recommended games based on query
  modalSearch.addEventListener('input', () => {
    const query = modalSearch.value.toLowerCase();
    sidebarContainer.innerHTML = '';
    const filteredGames = gamesData.filter(game =>
      (game.title.toLowerCase().includes(query) ||
       game.tags.toLowerCase().includes(query) ||
       game.description.toLowerCase().includes(query)) &&
      game.title !== gameTitle // exclude current game
    );
    filteredGames.forEach(game => {
      const sidebarGame = document.createElement('div');
      sidebarGame.className = 'sidebar-game';
      sidebarGame.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });
      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarGame.appendChild(thumb);
      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      sidebarGame.appendChild(titleDiv);
      sidebarContainer.appendChild(sidebarGame);
    });
  });
});
