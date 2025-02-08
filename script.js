document.addEventListener('DOMContentLoaded', () => {
  let gamesData = [];
  const gameGrid = document.getElementById('gameGrid');
  const modalOverlay = document.getElementById('modalOverlay');
  const gameIframe = document.getElementById('gameIframe');
  const closeModalBtn = document.getElementById('closeModal');
  const sidebarContainer = document.getElementById('sidebarGames');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Function to render the homepage game grid
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

      // On click, open modal and load game embed
      card.addEventListener('click', () => {
        openModal(game);
      });

      gameGrid.appendChild(card);
    });
  }

  // Fetch games.json
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      renderGameGrid(gamesData);
    })
    .catch(error => console.error('Error fetching games:', error));

  // Open modal and load selected game embed, plus populate sidebar
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

  // Fullscreen button
  fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
      gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
      gameIframe.msRequestFullscreen();
    }
  });

  // Populate sidebar with recommended games (exclude selected)
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
});
