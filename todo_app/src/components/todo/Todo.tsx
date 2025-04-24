import React, { useContext, useEffect, useState } from 'react';
import { getTodoList, addTask, updateTask, deleteTask } from '../../service/todo';
import { TodoCard } from '../todo-card/Todo-card';
import { Button, TextField, Box, Typography } from '@mui/material';
import todoStyles from './TodoStyles.module.scss';
import { userContext } from '../../context/userContext';
import { Logout } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

interface Todo {
    _id: string;
    title: string;
    description: string;
    status: string;
}

interface UpdateTask {
    title: string,
    description?: string,
    status?: string,
}

const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState('');
    const userCtx = useContext(userContext);
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
            const data = await getTodoList();
            console.log('Fetched Todos:', data); // Debugging
            if (data?.status === 200) {
                setTodos(data?.data?.data);
            }
        } catch (e) {
            console.error('Failed to Fetch Todos!', e);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            console.log('userctx', userCtx);
            if (!userCtx?.user?.id) {
                console.error('User ID is missing. Cannot add task.');
                return;
            }
            const taskData = {
                userid: userCtx.user.id,
                title: newTask,
            };
            const response = await addTask(taskData);
            console.log('Add Task Response:', response); // Debugging
            if (response.status === 201) {
                setNewTask(''); // Clear the input field
                fetchTodos(); // Fetch the updated task list
            }
        } catch (e) {
            console.error('Failed to add task:', e);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteTask(id);
            if (response.status === 200) {
                fetchTodos(); // Fetch the updated task list
            }
        } catch (e) {
            console.error('Failed to delete task:', e);
        }
    };

    const handleLogout = () => {
        console.log('loggedOUt')
        userCtx?.logout();
        toast.success('Logged Out successfully!!');
        setTimeout(() => {
            navigate('/signin');
        }, 3000)
    }

    const handleUpdate = async (id: string, updatedTask: Partial<Todo>) => {
        try {
            if (!userCtx?.user?.id) {
                console.error('User ID is missing. Cannot add task.');
                return;
            }
            const response = await updateTask(id, { ...updatedTask, userid: userCtx.user.id });
            if (response.status === 200) {
                fetchTodos(); // Refresh the task list
            }
        } catch(e: any) {
            console.error("Failed to update the task!");
        }
    }

    return (
        <>
        <ToastContainer />
        <Box display={'flex'} flexDirection={'column'} className={todoStyles['maincontainer']} >
            <Box display={'flex'} justifyContent={'space-between'}>
            <Typography className={todoStyles['heading']} variant='h4'>My ToDo App</Typography>
            <Logout className={todoStyles['logout']} onClick={handleLogout}/>
            </Box>
            <Box display='flex' className={todoStyles['container']}>
                <TextField
                    label="Add new task"
                    margin="normal"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button
                    variant="outlined"
                    className={todoStyles['button']}
                    onClick={handleAddTask}
                >
                    Add
                </Button>
            </Box>
            <Box className={todoStyles['mainlistcontainer']}>
                <ul className={todoStyles['listcontainer']}>
                    {todos?.map(todo => (
                        <li key={todo._id}>
                            <TodoCard
                                task={todo}
                                onDelete={() => handleDelete(todo._id)}
                                onUpdate={(updatedTask) => handleUpdate(todo._id, updatedTask)}
                            />
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
        </>
    );
};

export default Todo;