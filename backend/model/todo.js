const mongoose = require('mongoose');
const { Schema } = mongoose;


const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // links todo to the logged-in user
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    dueDate: { 
        type: Date,
    }
}, 
{
    timestamps: true
});


const Todo = mongoose.model('Todo', todoSchema);
module.exports = {
    Todo
}