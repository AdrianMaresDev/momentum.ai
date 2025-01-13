import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

//Register a new user endpoint (/auth/register)
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    //Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Save the new user and encrypted password to the database
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        //When a user is created, add a default task for them
        const defaultTask = 'Add your first task here!';
        const insertTask = db.prepare(`INSERT INTO tasks (user_id, task)
            VALUES (?, ?)`);
            insertTask.run(result.lastInsertRowid, defaultTask);

        //Create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' });
        res.json({ token });
    } catch(err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.post('/login', (req, res) => {
    //The passwords are encrypted in the database, so the password that the user enters must also be encrypted
    //When the two encrypted passwords are compared, they will match
});

export default router;