document.addEventListener('DOMContentLoaded', () => {
  // Get query parameter for selected game title
  const params = new URLSearchParams(window.location.search);
  const gameTitle = params.get('game');

  const gameIframe = document.getElementById('gameIframe');
  const sidebarGamesContainer = document.getElementById('sidebarGames');
  const modalSearch = document.getElementById('modalSearch');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');
  
  let gamesData = [];
  let likeClicked = false;
  let dislikeClicked = false;

  // Fetch games.json data
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      // Find the selected game using the title from the URL
      const selectedGame = gamesData.find(game => game.title === gameTitle);
      if (selectedGame) {
        gameIframe.src = selectedGame.embed;
      } else {
        console.error('Selected game not found:', gameTitle);
        gameIframe.src = "";
      }
      populateSidebar(selectedGame);
    })
    .catch(error => console.error('Error fetching games:', error));

  // Populate the sidebar with recommended games (excluding the selected game)
  function populateSidebar(selectedGame) {
    sidebarGamesContainer.innerHTML = '';
    gamesData.forEach(game => {
      if (selectedGame && game.title === selectedGame.title) return;
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('sidebar-game');
      sidebarItem.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });
      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarItem.appendChild(thumb);
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('sidebar-game-title');
      titleDiv.textContent = game.title;
      sidebarItem.appendChild(titleDiv);
      sidebarGamesContainer.appendChild(sidebarItem);
    });
  }

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

  // Like button: allow only one click
  likeBtn.addEventListener('click', () => {
    if (!likeClicked && !dislikeClicked) {
      likeClicked = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      likeBtn.classList.add('selected');
      console.log('Liked game:', gameTitle);
      // Optionally send rating to a server here
    }
  });

  // Dislike button: allow only one click
  dislikeBtn.addEventListener('click', () => {
    if (!dislikeClicked && !likeClicked) {
      dislikeClicked = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      dislikeBtn.classList.add('selected');
      console.log('Disliked game:', gameTitle);
      // Optionally send rating to a server here
    }
  });

  // Search functionality for sidebar recommendations
  modalSearch.addEventListener('input', () => {
    const query = modalSearch.value.toLowerCase();
    sidebarGamesContainer.innerHTML = '';
    const filteredGames = gamesData.filter(game => 
      (game.title.toLowerCase().includes(query) ||
       game.tags.toLowerCase().includes(query) ||
       game.description.toLowerCase().includes(query)) &&
      game.title !== gameTitle
    );
    filteredGames.forEach(game => {
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('sidebar-game');
      sidebarItem.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });
      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarItem.appendChild(thumb);
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('sidebar-game-title');
      titleDiv.textContent = game.title;
      sidebarItem.appendChild(titleDiv);
      sidebarGamesContainer.appendChild(sidebarItem);
    });
  });
});
