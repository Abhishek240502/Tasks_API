const express = require('express');
const { log } = require('node:console');

const app = express();
const tasks = [];

app.use(express.json());  //convert req body into json

app.get('/tasks',(req, res,next)=>{
    console.log('req.body',req.body);
    res.status(200).json({
        tasks : tasks
    });
});


app.post('/task',(req,res,next)=>{
    if(! req.body.task){
        res.status(400).json("Task is Required...");
    }
    tasks.push(req.body.Task);
    res.status(200).json({
        message : 'Task Added Successfully...'
    });
});

app.delete('/task/:index', (req,res,next)=>{
    if(! req.params.index){
        res.status(400).json("Invalid Index...");
    }
    tasks.splice(req.params.index , 1);
    res.status(200).json({
        message:'Task Deleted Successfully...'
    });
});

app.put('/task/:index',(req,res,next)=>{
    if(! req.params.index){
        res.status(400).json("Give Valid Index...");
    }
    tasks[req.params.index] = req.body.task;
    res.status(200).json("Task Updated Successfully...");
});


const port = 3000;
app.listen(port, () =>{
    console.log(`server started at port ${port}`);  
})