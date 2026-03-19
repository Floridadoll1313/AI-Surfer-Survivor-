import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Setup Folders
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// 2. Middleware & Static Files
app.use(express.json());
// Ensure assets load correctly regardless of the URL depth
app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));
app.use(express.static(path.join(__dirname, '../dist')));

// 3. Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Surfer Survivor' });
});

// Sends the React app for dashboard routes
app.get(['/dashboard-pink', '/dashboard-blue'], (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

export default app;