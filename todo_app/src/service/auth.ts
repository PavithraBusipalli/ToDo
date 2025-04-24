import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

const login = async (email: string, password: string) => {
    console.log(API_BASE_URL);
    // if (!API_BASE_URL) {
    //     throw new Error('API_BASE_URL is not defined in the environment variables');
    // }
    try {
        const response = await axios.post(`http://localhost:5000/api/signin`, {
            email, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response;
    } catch(e) {
        throw new Error('Login failed');
    }
}

const register = async (name: string, email: string, password: string) => {
    // if (!API_BASE_URL) {
    //     throw new Error('API_BASE_URL is not defined in the environment variables');
    // }
    try {
        const response = await axios.post(`http://localhost:5000/api/signup`, {
            name, email, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response;
    } catch(e) {
        throw new Error('Registration failed');
    }
}

export { login, register };