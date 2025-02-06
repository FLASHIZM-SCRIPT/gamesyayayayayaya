document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const searchInput = document.getElementById('searchInput');

    // Fetch games from games.json
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            displayGames(games);

            // Search functionality
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

    // Function to display games
    function displayGames(games) {
        gameContainer.innerHTML = '';
        games.forEach(game => {
            const gameCard = document.create
::contentReference[oaicite:0]{index=0}
 
