document.addEventListener('DOMContentLoaded', () => {
  // Get the selected game title from the query parameter (e.g., ?game=Ragdoll%20Hit%20Stickman)
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
  
  // Debug log to confirm script load
  console.log("game.js loaded. Game title from URL:", gameTitle);
  
  // Fetch games data from games.json
  fetch('games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      gamesData = data;
      // Find the selected game by title (case-sensitive matching)
      const selectedGame = gamesData.find(game => game.title === gameTitle);
      if (selectedGame) {
        console.log("Selected game found:", selectedGame);
        gameIframe.src = selectedGame.embed;
      } else {
        console.error('Selected game not found:', gameTitle);
        gameIframe.src = "";
      }
      populateSidebar(selectedGame);
    })
    .catch(error => console.error('Error fetching games:', error));
  
  // Populate the recommended games sidebar (exclude the selected game)
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
  
  // Fullscreen toggle for the iframe
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
      console.log("Liked game:", gameTitle);
      // Optionally send rating info to your server here
    }
  });
  dislikeBtn.addEventListener('click', () => {
    if (!ratingGiven) {
      ratingGiven = true;
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      dislikeBtn.classList.add('selected');
      console.log("Disliked game:", gameTitle);
      // Optionally send rating info to your server here
    }
  });
  
  // Sidebar search filtering for recommended games
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
