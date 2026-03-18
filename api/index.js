import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware: Parses data and prevents the "hang"
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Survivor Path: ${req.url}`);
    next(); 
});

// Serve the CSS/JS/Images Vite creates
app.use(express.static(path.join(__dirname, 'dist')));

// --- ROUTES ---

// 1. Home Page (EJS)
app.get('/', (req, res) => {
    res.render('index', { title: 'Surfer Survivor Home' });
});

// 2. Dashboards (React)
// These routes send the main HTML file so React can show your .jsx components
app.get(['/dashboard-pink', '/dashboard-blue'], (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

export default app;
