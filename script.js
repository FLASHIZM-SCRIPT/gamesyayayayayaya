document.addEventListener('DOMContentLoaded', () => {
  fetch('games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(games => {
      const grid = document.getElementById('gameGrid');
      games.forEach(game => {
        // Create the game card element
        const card = document.createElement('div');
        card.classList.add('game-card');

        // Create the image element
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.title;
        card.appendChild(img);

        // Create the title element (initially hidden below the card)
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('game-title');
        titleDiv.textContent = game.title;
        card.appendChild(titleDiv);

        // On click, navigate to game.html with a query parameter
        card.addEventListener('click', () => {
          window.location.href = `game.html?game=${encodeURIComponent(game.title)}`;
        });

        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching games:', error);
    });
});
