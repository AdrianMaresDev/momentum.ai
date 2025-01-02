//Install dotenv at a later date

import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

//Get the file path from the current module URL
const __filename = fileURLToPath(import.meta.url);

//Get the directory name
const __dirname = dirname(__filename);

//Determine where the public folder is and serve as static file
app.use(express.static(path.join(__dirname, '../public')));

//Serve the HTML file from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`)
});