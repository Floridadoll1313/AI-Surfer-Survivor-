// This tells Express to look for your "Pink" template
app.get('/pink-surfboard', (req, res) => {
    // Make sure the file in your /views folder is named exactly pink-surfboard.ejs
    res.render('pink-surfboard', { title: 'Pink Dashboard' });
});

// This ensures all your Vite-built styles/images are found
app.use(express.static(path.join(__dirname, 'dist')));
