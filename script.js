document.addEventListener('DOMContentLoaded', () => {
  let gamesData = [];
  const gameGrid = document.getElementById('gameGrid');
  const modalOverlay = document.getElementById('modalOverlay');
  const gameIframe = document.getElementById('gameIframe');
  const closeModalBtn = document.getElementById('closeModal');
  const sidebarContainer = document.getElementById('sidebarGames');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const mainSearch = document.getElementById('mainSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Render the game grid on the homepage
  function renderGameGrid(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');

      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('game-title');
      titleDiv.textContent = game.title;
      card.appendChild(titleDiv);

      // When a game card is clicked, open the modal with the game embed
      card.addEventListener('click', () => {
        openModal(game);
      });

      gameGrid.appendChild(card);
    });
  }

  // Fetch games data from games.json
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      renderGameGrid(gamesData);
    })
    .catch(error => console.error('Error fetching games:', error));

  // Open modal with the selected game and populate the sidebar
  function openModal(selectedGame) {
    gameIframe.src = selectedGame.embed;
    modalOverlay.style.display = 'flex';
    populateSidebar(selectedGame);
  }

  // Close modal
  closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    gameIframe.src = '';
  });

  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
      gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
      gameIframe.msRequestFullscreen();
    }
  });

  // Populate recommended games in the modal sidebar (exclude the selected game)
  function populateSidebar(selectedGame) {
    sidebarContainer.innerHTML = '';
    gamesData.forEach(game => {
      if (game.title === selectedGame.title) return;
      const sidebarGame = document.createElement('div');
      sidebarGame.classList.add('sidebar-game');
      sidebarGame.addEventListener('click', () => {
        openModal(game);
      });

      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarGame.appendChild(thumb);

      const title = document.createElement('div');
      title.classList.add('sidebar-game-title');
      title.textContent = game.title;
      sidebarGame.appendChild(title);

      sidebarContainer.appendChild(sidebarGame);
    });
  }

  // Main search: filter games by title, tags, or description
  mainSearch.addEventListener('input', () => {
    const query = mainSearch.value.toLowerCase();
    const filteredGames = gamesData.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.tags.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query)
    );
    renderGameGrid(filteredGames);
  });

  // Sidebar filter buttons: filter games based on tag (assuming tags are comma-separated)
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (filter === 'all') {
        renderGameGrid(gamesData);
      } else {
        const filteredGames = gamesData.filter(game => {
          return game.tags.toLowerCase().split(',').map(tag => tag.trim()).includes(filter);
        });
        renderGameGrid(filteredGames);
      }
    });
  });
});
