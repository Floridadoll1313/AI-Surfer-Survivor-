import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tell Express to use EJS and where to find the templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CRITICAL: This serves the files Vite built (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'dist')));

// Route for the Pink Surfboard page
app.get('/pink-surfboard', (req, res) => {
    // Ensure the file is named 'pink-surfboard.ejs' in your /views folder
    res.render('pink-surfboard', { title: 'Pink Surfboard Dashboard' });
});

// For Vercel, we export the app instead of using app.listen
export default app;
