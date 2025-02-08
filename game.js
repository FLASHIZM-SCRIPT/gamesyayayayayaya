const games = [
  { id: 1, name: "Game 1", src: "game1.html", likes: 0, dislikes: 0 },
  { id: 2, name: "Game 2", src: "game2.html", likes: 0, dislikes: 0 },
];

// Populate game suggestions
const gameSuggestions = document.getElementById("game-suggestions");
games.forEach((game) => {
  const gameItem = document.createElement("li");
  gameItem.textContent = game.name;
  gameItem.onclick = () => loadGame(game);
  gameSuggestions.appendChild(gameItem);
});

// Load a game
const iframe = document.getElementById("game-iframe");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");
let currentGame = null;

function loadGame(game) {
  iframe.src = game.src;
  currentGame = game;
  likeCount.textContent = game.likes;
  dislikeCount.textContent = game.dislikes;
}

// Like/Dislike functionality
document.getElementById("like-btn").onclick = () => {
  if (currentGame) {
    currentGame.likes++;
    likeCount.textContent = currentGame.likes;
  }
};

document.getElementById("dislike-btn").onclick = () => {
  if (currentGame) {
    currentGame.dislikes++;
    dislikeCount.textContent = currentGame.dislikes;
  }
};

// Fullscreen button
document.getElementById("fullscreen-btn").onclick = () => {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  }
};
