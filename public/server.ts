import express from 'express';
import path from 'path';
import homepageRouter from './homepage';

const app = express();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});