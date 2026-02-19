const express = require('express');
const app = express();
app.use(express.json());

// This would eventually connect to MongoDB/PostgreSQL
let globalLeaderboard = [];

app.post('/api/save-score', (req, res) => {
  const { username, score, avatar } = req.body;
  
  // Add new score to memory (or DB)
  globalLeaderboard.push({ username, score, avatar, date: new Date() });
  
  // Sort and keep top 10
  globalLeaderboard.sort((a, b) => b.score - a.score);
  globalLeaderboard = globalLeaderboard.slice(0, 10);
  
  res.json({ success: true, leaderboard: globalLeaderboard });
});

app.listen(5000, () => console.log('Server running on port 5000'));
