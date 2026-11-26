
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --accent: #a855f7;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #090811;
  color: white;
  font-family: Arial, sans-serif;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #100d1b;
  padding: 22px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #302044;
}

.logo {
  font-size: 25px;
  font-weight: bold;
  color: var(--accent);
  letter-spacing: 3px;
}

nav {
  display: flex;
  gap: 22px;
}

nav a {
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

nav a:hover {
  color: var(--accent);
}

section {
  padding: 100px 8%;
  scroll-margin-top: 75px;
}

.hero {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: radial-gradient(circle, #27113f, #090811 65%);
}

.tag {
  color: var(--accent);
  letter-spacing: 5px;
}

.hero h1 {
  font-size: clamp(65px, 12vw, 120px);
  color: var(--accent);
  text-shadow: 0 0 35px var(--accent);
  margin: 15px 0;
}

.hero p {
  color: #bbb;
  margin-bottom: 25px;
}

.btn {
  background: var(--accent);
  color: white;
  padding: 14px 30px;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s;
}

.btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 25px var(--accent);
}

h2 {
  color: var(--accent);
  font-size: 35px;
  margin-bottom: 30px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.card {
  display: block;
  background: #171323;
  border: 1px solid #38234d;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 15px;
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

.card:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
  box-shadow: 0 0 20px #a855f733;
}

.card h3 {
  color: var(--accent);
  margin-bottom: 10px;
}

.card p {
  color: #bbb;
  line-height: 1.6;
}

details {
  background: #171323;
  border: 1px solid #38234d;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 12px;
}

summary {
  cursor: pointer;
  color: var(--accent);
}

details p {
  margin-top: 15px;
  color: #bbb;
}

select {
  background: #171323;
  color: white;
  padding: 12px;
  margin-left: 15px;
  border: 1px solid var(--accent);
  border-radius: 8px;
}

footer {
  text-align: center;
  padding: 30px;
  background: #100d1b;
  color: #999;
}

@media (max-width: 650px) {
  header {
    flex-direction: column;
    gap: 18px;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  section {
    padding: 70px 6%;
  }
}
