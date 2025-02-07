document.addEventListener('DOMContentLoaded', () => {
  // Make sure the container element exists
  const container = document.querySelector('.container');
  if (!container) {
    console.error('Container element not found. Check your HTML.');
    return;
  }

  // Fetch the games.json file (ensure the path is correct)
  fetch('games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(games => {
      // Loop through each game in the JSON array
      games.forEach(game => {
        // Create a new game card element
        const card = document.createElement('div');
        card.classList.add('game-card');

        // Create and set the image element
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.title;
        card.appendChild(img);

        // Create the game title element (initially positioned off-view)
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('game-title');
        titleDiv.textContent = game.title;
        card.appendChild(titleDiv);

        // Optionally, add a click event listener (e.g., to load the embed)
        card.addEventListener('click', () => {
          // For now, just log the embed URL. Replace this with your modal or navigation logic.
          console.log('Embed URL:', game.embed);
        });

        // Append the constructed card to the container
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching or parsing games.json:', error);
    });
});
