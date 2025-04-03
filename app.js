const express = require('express');
const sql = require('./db');
const { log } = require('node:console');

const app = express();
//const tasks = [];

app.use(express.json());  //convert req body into json


app.post('/task', async (req, res, next) => {
    try {
        const { id, newTask } = req.body;

        if (!id || !newTask) {
            return res.status(400).json({
                message: 'Please provide both "id" and "newTask"',
            });
        }

        // Insert the task into the database
        await sql`INSERT INTO tasks (id, name) VALUES (${req.body.id}, ${req.body.newTask})`;

        res.status(200).json({
            message: 'Task added successfully',
        });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});



app.get('/tasks', async(req,res,next)=>{
    try {
        const tasks = await sql`select * from tasks`;

        res.status(200).json({
            message : 'Task Getting Successfully...',
            tasks : tasks
        });
    } catch (error) {
        res.status(500).json({
            message : 'Something Went Wrong',
            error : error.message
        });
    }
});

app.delete('/deleteTask/:id', async(req,res,next)=>{
    try {
        const id = req.params.id;
        await sql `delete from tasks where id = ${id}`;
        res.status(200).json({
            message : 'Deleted Successfully...'
        });
    } catch (error) {
        res.status(500).json({
            message : 'Something went Wrong...',
            error : error.message
        });
    }
});

//updating
app.put('/updateTask/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const newTask = req.body.newTask;

        if (!newTask) {
            return res.status(400).json({
                message: 'Please provide a task in "newTask"',
            });
        }

        // Update task in the database
        const result = await sql`UPDATE tasks SET name = ${newTask} WHERE id = ${id}`;

        // Check if any rows were updated
        if (result.count === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
        });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});


const port = 3000;
app.listen(port, () =>{
    console.log(`server started at port ${port}`);  
})