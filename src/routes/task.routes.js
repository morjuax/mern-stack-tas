const express = require('express');
const router = express.Router();

const Task = require('../models/tasks');

router.get('/', async (req, res) => {
    let tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    let task = await Task.findById(id);
    res.json(task);
});

router.post('/', async (req, res) => {
    let {title, description} = req.body;

    let task = new Task({
        title,
        description
    });

    await task.save();

    res.json({
        status: 1,
        message: 'Task saved!',
        data: task,
    })
});

router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {title, description} = req.body;

    let newTask = {title, description};

    let responseUpdate = await Task.findByIdAndUpdate(id, newTask);

    res.json({
        status: 1,
        message: 'Task updated!',
        data: "",
    })
});

router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    await Task.findByIdAndRemove(id);

    res.json({
        status: 1,
        message: 'Task deleted!',
        data: "",
    })
});

module.exports = router;