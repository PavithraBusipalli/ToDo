import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const getTodoList = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/todo`);
        return res;
    } catch(e: any) {
        console.log('error: ', e.message);
        throw new Error(e.message);
    }
}

interface task {
    userid: string,
    title: string,
    description?: string
}
const addTask = async (task: task) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/todo`, task);
        return res;
    } catch(e: any) {
        throw new Error(e.message);
    }
}

const updateTask = async (id: string, task: Partial<task>) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/api/todo/${id}`, task);
        return res;
    } catch(e: any) {
        throw new Error(e.message);
    }
}

const deleteTask = async (id: string) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/api/todo/${id}`);
        return res;
    } catch(e: any) {
        throw new Error(e.message);
    }
}

export {
    getTodoList,
    addTask,
    updateTask,
    deleteTask,
}

