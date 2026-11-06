const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ==========================================
// CRUD API ROUTES
// ==========================================

// 1. GET ALL TASKS (READ)
app.get('/api/tasks', async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks ORDER BY id DESC');
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// 2. GET SINGLE TASK BY ID (READ)
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// 3. CREATE A TASK (CREATE)
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, priority, due_date } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Task title is required' });
        }

        const taskPriority = priority || 'Medium';
        const taskDueDate = due_date || null;
        const taskDesc = description || null;
        const taskStatus = 'Pending';

        const [result] = await db.query(
            'INSERT INTO tasks (title, description, priority, due_date, status) VALUES (?, ?, ?, ?, ?)',
            [title.trim(), taskDesc, taskPriority, taskDueDate, taskStatus]
        );

        const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// 4. UPDATE A TASK (UPDATE)
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, due_date, status } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Task title is required' });
        }

        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, priority = ?, due_date = ?, status = ? WHERE id = ?',
            [title.trim(), description || null, priority || 'Medium', due_date || null, status || 'Pending', id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const [updatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// 5. UPDATE TASK STATUS (PATCH)
app.patch('/api/tasks/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['Pending', 'Completed'].includes(status)) {
            return res.status(400).json({ error: 'Status must be Pending or Completed' });
        }

        const [result] = await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const [updatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// 6. DELETE A TASK (DELETE)
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
