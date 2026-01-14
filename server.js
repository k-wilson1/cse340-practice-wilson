// Imports 
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

// Declare Important Variables 
const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT ||3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Setup Express Server
const app = express();

// Configure Express middleware

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// SET EJS as the templating engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src/views'));

// Declare routes
/**
 * Routes
 */
app.get('/', (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
});
app.get('/about', (req, res) => {
    const title = 'About Me';
    res.render('about', { title });
});
app.get('/products', (req, res) => {
    const title = 'Our Products';
    res.render('products', { title });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});