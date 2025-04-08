//////////////////////////
// Imports
//////////////////////////
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
const pathToDistFolder = path.join(__dirname, '../frontend/dist');
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////

const serveStatic = express.static(pathToDistFolder);

app.use(serveStatic);


const trendingGifs = async (req, res) => {
 const url = `https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`
   console.log(`API_KEY: ${process.env.API_KEY}`)
   console.log(`URL: ${url}`)
 
 try {
        const response = await fetch(url);
        const data = await response.json();
        
        res.send(data);
    
    } catch(error) {
    res.status(503).send(error);
    }
}
    
app.get('/api/gifs', trendingGifs)

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 