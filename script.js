fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('games-container');

    games.forEach(game => {
      // Create card container
      const card = document.createElement('div');
      card.classList.add('card');

      // Add game image
      const img = document.createElement('img');
      img.src = game.image;
      img.alt = game.title;

      // Add game title
      const title = document.createElement('div');
      title.classList.add('card-title');
      title.textContent = game.title;

      // Add game description
      const description = document.createElement('div');
      description.classList.add('card-description');
      description.textContent = game.description;

      // Add buttons
      const buttons = document.createElement('div');
      buttons.classList.add('card-buttons');

      const playButton = document.createElement('a');
      playButton.href = game.embed;
      playButton.textContent = 'Play Now';
      playButton.target = '_blank';

      buttons.appendChild(playButton);

      // Append elements to card
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(buttons);

      // Add card to container
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading games:', error));
