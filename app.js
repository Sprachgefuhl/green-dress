require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const { getStreak, handleStreak, updateDresses } = require('./controllers/streak');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  const streak = await getStreak();
  // const updated = await handleStreak(streak.current, streak.high, streak.dresses);

  res.render('index', {
    // current: streak.current,
    // high: updated.high,
    lastSpoke: streak.last_spoke,
    dresses: streak.dresses
  });
});

app.post('/batch', async (req, res) => {
  try {
    const clicks = Number(req.body.clicks);
    await updateDresses(clicks);

    res.json({ success: true });
  } catch (err) {
    console.error('Batch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.send(200);
});

app.listen(PORT, () => console.log(`Server running: ${PORT}`));