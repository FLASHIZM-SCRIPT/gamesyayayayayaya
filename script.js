:root {
  --bg-color: #121212;
  --card-bg: #1f1a1a;
  --sidebar-bg: #1e1e2d;
  --primary-purple: #4b3f72; /* Darker, richer purple */
  --accent-glow: rgba(75, 63, 114, 0.6);
  --text-color: #ffffff;
  --radius: 10px;
  --transition: 0.3s ease;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body & Global */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: var(--card-bg);
  box-shadow: 0 2px 8px var(--accent-glow);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-purple);
}
#searchInput {
  width: 250px;
  padding: 10px;
  border: 1px solid var(--primary-purple);
  border-radius: 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  outline: none;
  transition: border-color var(--transition);
}
#searchInput:focus {
  border-color: var(--primary-purple);
}

/* Main Layout */
.container {
  display: flex;
  width: 100%;
  padding: 20px;
}

/* Sidebar for Filtering */
.sidebar {
  width: 220px;
  background-color: var(--sidebar-bg);
  padding: 20px;
  border-radius: var(--radius);
  margin-right: 20px;
}
.sidebar h2 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--primary-purple);
}
.filter {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: var(--card-bg);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background-color var(--transition), transform var(--transition);
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter img {
  width: 24px;
  height: 24px;
}
.filter span {
  font-size: 1rem;
  color: var(--text-color);
}
.filter:hover {
  background-color: var(--primary-purple);
  transform: scale(1.05);
}

/* Content Area & Game Grid */
.content {
  flex: 1;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Game Card */
.game-card {
  position: relative;
  background-color: var(--card-bg);
  border: 2px solid var(--primary-purple);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
  cursor: pointer;
}
.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 15px var(--accent-glow);
}
.game-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.game-card .game-title {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 10px;
  font-size: 1.1rem;
  transition: bottom var(--transition);
}
.game-card:hover .game-title {
  bottom: 0;
}

/* Footer */
footer {
  background-color: var(--card-bg);
  text-align: center;
  padding: 15px;
  margin-top: 20px;
  box-shadow: 0 -2px 8px var(--accent-glow);
  color: var(--text-color);
}
