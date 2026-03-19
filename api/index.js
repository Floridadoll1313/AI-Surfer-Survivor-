import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

<<<<<<< HEAD
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
=======
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Crucial: Point to the dist folder where Vite put the Pink/Blue code
app.use(express.static(path.join(__dirname, '../dist')));

// 1. Home Page (EJS)
app.get('/', (req, res) => {
    res.render('index'); 
});

// 2. Surfboard Hand-off (React)
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367
app.get(['/dashboard-pink', '/dashboard-blue'], (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367
