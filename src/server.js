import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

//Get the file path from the current module URL
const __filename = fileURLToPath(import.meta.url);

//Get the directory name
const __dirname = dirname(__filename);

//Middleware - Tells express to expect json data
app.use(express.json());

//Determine where the public folder is and serve contents as static files
app.use(express.static(path.join(__dirname, '../public')));

//Serve the HTML file from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`);
});