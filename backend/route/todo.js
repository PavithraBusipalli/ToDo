const express = require('express');
const router = express.Router();
const {     
    createTask,
    getAllTasks,
    updateTask,
    deleteTask } = require('../controller/todo');

router.post('/todo', createTask);
router.get('/todo', getAllTasks);
router.put('/todo/:id', updateTask);
router.delete('/todo/:id', deleteTask);

module.exports = router;