document.addEventListener('DOMContentLoaded', () => {
    fetch('data/games.json')
        .then(response => response.json())
        .then(games => {
            const gameList = document.getElementById('game-list');
            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';

                const gameImage = document.createElement('img');
                gameImage.src = game.image;
                gameImage.alt = game.title;
                gameImage.className = 'game-image';

                const gameContent = document.createElement('div');
                gameContent.className = 'game-content';

                const gameTitle = document.createElement('h2');
                gameTitle.className = 'game-title';
                gameTitle.textContent = game.title;

                const gameDescription = document.createElement('p');
                gameDescription.className = 'game-description';
                gameDescription.textContent = game.description;

                const playButton = document.createElement('a');
                playButton.className = 'play-button';
                playButton.href = game.embed;
                playButton.target = '_blank';
                playButton.textContent = 'Play Now';

                gameContent.appendChild(gameTitle);
                gameContent.appendChild(gameDescription);
                gameContent.appendChild(playButton);

                gameCard.appendChild(gameImage);
                gameCard.appendChild(gameContent);

                gameList.appendChild(gameCard);
            });
        })
        .catch(error => console.error('Error fetching games:', error));
});
