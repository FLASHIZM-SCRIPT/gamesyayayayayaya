document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const searchInput = document.getElementById('searchInput');

    // Fetch games from games.json
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            displayGames(games);

            // Implement search functionality
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredGames = games.filter(game =>
                    game.title.toLowerCase().includes(searchTerm) ||
                    game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
                displayGames(filteredGames);
            });
        })
        .catch(error => console.error('Error loading games:', error));

    // Function to display games in the container
    function displayGames(games) {
        gameContainer.innerHTML = ''; // Clear existing content

        games.forEach(game => {
            // Create the game card element
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');

            // Create a link element wrapping the image and title (so clicking anywhere opens the game)
            const link = document.createElement('a');
            link.href = game.embed;
            link.target = '_blank';

            // Create and append the game image
            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.title;
            link.appendChild(img);

            // Create and append the game title
            const title = document.createElement('h3');
            title.textContent = game.title;
            link.appendChild(title);

            // Append the link to the game card, then the game card to the container
            gameCard.appendChild(link);
            gameContainer.appendChild(gameCard);
        });
    }
});
