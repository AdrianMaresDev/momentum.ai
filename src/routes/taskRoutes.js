import express from 'express';
import db from '../db.js';

const router = express.Router();

//Get all tasks for logged in user
router.get('/', (req, res) => {
    const getTasks = db.prepare('SELECT * FROM tasks WHERE user_id = ?');
    const tasks = getTasks.all(req.userId);
    res.json({ tasks })
});

//Create new task
router.post('/', (req, res) => {});

//Update existing task using dynamic parameter from SQLite
router.put('/:id', (req, res) => {});

//Delete a task
router.delete('/:id', (req, res) => {});

export default router;