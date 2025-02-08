document.addEventListener('DOMContentLoaded', () => {
  let gamesData = [];
  const gameGrid = document.getElementById('gameGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter');

  // Function to render the game grid
  function renderGameGrid(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';

      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'game-title';
      titleDiv.textContent = game.title;
      card.appendChild(titleDiv);

      // On click, navigate to the game embed page (e.g., game.html?game=...)
      card.addEventListener('click', () => {
        window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
      });

      gameGrid.appendChild(card);
    });
  }

  // Fetch games.json data
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      renderGameGrid(gamesData);
    })
    .catch(error => console.error('Error fetching games:', error));

  // Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredGames = gamesData.filter(game => 
      game.title.toLowerCase().includes(query) ||
      game.tags.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query)
    );
    renderGameGrid(filteredGames);
  });

  // Filter buttons functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (filter === 'all') {
        renderGameGrid(gamesData);
      } else {
        const filteredGames = gamesData.filter(game => {
          return game.tags.toLowerCase().split(',').map(t => t.trim()).includes(filter);
        });
        renderGameGrid(filteredGames);
      }
    });
  });
});
