document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const selectedTitle = params.get('game');

  const gameIframe = document.getElementById('gameIframe');
  const sidebarList = document.getElementById('sidebarGameList');
  const searchInput = document.getElementById('searchInput');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Load the games.json file
  fetch('games.json')
    .then(response => response.json())
    .then(games => {
      // Find the selected game by title
      const selectedGame = games.find(g => g.title === selectedTitle);
      if (selectedGame) {
        gameIframe.src = selectedGame.embed;
      } else {
        console.error('Game not found:', selectedTitle);
        gameIframe.parentElement.innerHTML = '<p>Game not found.</p>';
      }
      
      // Populate the sidebar with modern buttons for other games
      games.forEach(game => {
        // Skip the selected game
        if (game.title === selectedTitle) return;
        const btn = document.createElement('div');
        btn.className = 'sidebar-game';
        btn.addEventListener('click', () => {
          window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
        });

        // Create thumbnail image
        const thumb = document.createElement('img');
        thumb.src = game.image;
        thumb.alt = game.title;
        btn.appendChild(thumb);

        // Create title label
        const label = document.createElement('div');
        label.className = 'sidebar-game-title';
        label.textContent = game.title;
        btn.appendChild(label);

        sidebarList.appendChild(btn);
      });
      
      // Search functionality: filter sidebar buttons based on title, tags, and description
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const sidebarGames = document.querySelectorAll('.sidebar-game');
        sidebarGames.forEach(item => {
          // Get the text content from title, and you can also check data attributes if set
          const titleText = item.querySelector('.sidebar-game-title').textContent.toLowerCase();
          // Check if query is present in the title (extend this if you want to check tags/description)
          item.style.display = titleText.includes(query) ? 'flex' : 'none';
        });
      });
    })
    .catch(error => console.error('Error loading games:', error));

  // Fullscreen toggle for the game embed
  fullscreenBtn.addEventListener('click', () => {
    const iframe = document.getElementById('gameIframe');
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  });
});
