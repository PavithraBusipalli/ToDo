const express = require('express');
const {Todo} = require('../model/todo');


const createTask = async (req, res) => {
    try {
        const {userid, title, description, status} = req.body;
        const newTask = new Todo({
            user: userid,
            title,
            description,
            status,
        });
        await newTask.save();
        return res.status(201).json({
            success: true,
            message: 'Task created successfully!',
            task: newTask
        })
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: 'Internal server Error',
            error: e.message,
        })
    }
}

const getAllTasks = async (req, res) => {
    try  {
        const allTasks = await Todo.find({}); 
        if(allTasks.length) {
            return res.status(200).json({
                success: true,
                message: 'All Tasks fetched successfully!',
                data: allTasks
            })
        } 
        return res.status(500).json({
            success: false,
            message: 'No tasks found',
            data: []
        })
    } catch(e) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error:e.message
        })
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate({_id: id});
        if(!todo) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        if(title) todo.title = title;
        if(description) todo.description = description;
        if(status) todo.status = status;
        if(dueDate) todo.dueDate = dueDate;
        await todo.save();
        res.status(200).json({
            success: true,
            message: 'Task updated successfully!',
            data: todo
        });
    } catch(e) {
        res.status(500).json({
            message: 'Server error',
            error: e.message
        })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Todo.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found!',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully!',
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e.message,
        });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
}