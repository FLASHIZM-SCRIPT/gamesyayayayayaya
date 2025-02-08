document.addEventListener('DOMContentLoaded', () => {
  // Read selected game title from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const gameTitle = params.get('game');

  // Select DOM elements
  const gameIframe = document.getElementById('gameIframe');
  const sidebarContainer = document.getElementById('sidebarGames');
  const modalSearch = document.getElementById('modalSearch');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  let gamesData = [];
  let ratingGiven = false;

  // Fetch games.json data
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      // Find the selected game
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

  // Populate recommended games sidebar (exclude selected game)
  function populateSidebar(selectedGame) {
    sidebarContainer.innerHTML = '';
    gamesData.forEach(game => {
      if (selectedGame && game.title === selectedGame.title) return;
      const sidebarItem = document.createElement('div');
      sidebarItem.className = 'sidebar-game';
      sidebarItem.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarItem.appendChild(thumb);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      sidebarItem.appendChild(titleDiv);

      sidebarContainer.appendChild(sidebarItem);
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

  // One-time Like/Dislike functionality
  likeBtn.addEventListener('click', () => {
    if (!ratingGiven) {
      ratingGiven = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      likeBtn.classList.add('selected');
      console.log("Liked:", gameTitle);
      // Optionally, send rating to your server
    }
  });
  dislikeBtn.addEventListener('click', () => {
    if (!ratingGiven) {
      ratingGiven = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      dislikeBtn.classList.add('selected');
      console.log("Disliked:", gameTitle);
      // Optionally, send rating to your server
    }
  });

  // Sidebar search filtering
  modalSearch.addEventListener('input', () => {
    const query = modalSearch.value.toLowerCase();
    sidebarContainer.innerHTML = '';
    const filteredGames = gamesData.filter(game =>
      (game.title.toLowerCase().includes(query) ||
       game.tags.toLowerCase().includes(query) ||
       game.description.toLowerCase().includes(query)) &&
      game.title !== gameTitle
    );
    filteredGames.forEach(game => {
      const sidebarItem = document.createElement('div');
      sidebarItem.className = 'sidebar-game';
      sidebarItem.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });
      const thumb = document.createElement('img');
      thumb.src = game.image;
      thumb.alt = game.title;
      sidebarItem.appendChild(thumb);
      const titleDiv = document.createElement('div');
      titleDiv.className = 'sidebar-game-title';
      titleDiv.textContent = game.title;
      sidebarItem.appendChild(titleDiv);
      sidebarContainer.appendChild(sidebarItem);
    });
  });
});
