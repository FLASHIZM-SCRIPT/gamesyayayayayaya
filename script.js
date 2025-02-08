document.addEventListener("DOMContentLoaded", () => {
  let gamesData = [];
  
  // Get elements
  const gameGrid = document.getElementById("gameGrid");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter");

  // Function to render game cards in the grid
  function renderGameGrid(games) {
    gameGrid.innerHTML = "";
    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";

      // Create and append image element
      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title;
      card.appendChild(img);

      // Create and append title element
      const titleDiv = document.createElement("div");
      titleDiv.className = "game-title";
      titleDiv.textContent = game.title;
      card.appendChild(titleDiv);

      // When the card is clicked, navigate to game.html with a query parameter
      card.addEventListener("click", () => {
        window.location.href = "game.html?game=" + encodeURIComponent(game.title);
      });

      gameGrid.appendChild(card);
    });
  }

  // Fetch games.json data
  fetch("games.json")
    .then(response => response.json())
    .then(data => {
      gamesData = data;
      renderGameGrid(gamesData);
    })
    .catch(error => console.error("Error fetching games:", error));

  // Search filtering: filter games based on title, tags, or description
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredGames = gamesData.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.tags.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query)
    );
    renderGameGrid(filteredGames);
  });

  // Filter button functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (filter === "all") {
        renderGameGrid(gamesData);
      } else {
        const filteredGames = gamesData.filter(game => {
          const tagsArray = game.tags.toLowerCase().split(",").map(tag => tag.trim());
          return tagsArray.includes(filter);
        });
        renderGameGrid(filteredGames);
      }
    });
  });
});
