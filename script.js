document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');

  // Fetch games from games.json
  fetch('games.json')
    .then(response => response.json())
    .then(games => {
      displayGames(games);
    })
    .catch(error => console.error('Error loading games:', error));

  // Function to display games in the container
  function displayGames(games) {
    gameContainer.innerHTML = ''; // Clear any existing content

    games.forEach(game => {
      // Create the game card container
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');

      // Create a link wrapping the image and title
      const link = document.createElement('a');
      link.href = game.embed;
      link.target = '_blank';

      // Create the image element
      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;
      link.appendChild(img);

      // Create the title element
      const title = document.createElement('h3');
      title.textContent = game.title;
      link.appendChild(title);

      // Append the link to the game card, and the card to the container
      gameCard.appendChild(link);
      gameContainer.appendChild(gameCard);
    });
  }
});

