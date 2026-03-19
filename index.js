import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We use '..' because index.js is now inside the /api folder
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use((req, res, next) => {
    next(); 
});

// Point static files to the root /dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// --- ROUTES ---
app.get('/', (req, res) => {
    res.render('index', { title: 'Surfer Survivor' });
});

// React Dashboards (Pink & Blue)
app.get(['/dashboard-pink', '/dashboard-blue'], (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

export default app;
