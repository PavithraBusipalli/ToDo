import React, { useState, useContext } from 'react';
import {Box, Grid, Typography, TextField, Button } from '@mui/material';
import mystyles from './LoginStyles.module.scss';
import { login } from '../../service/auth'; // Import the login function from auth service
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userContext } from '../../context/userContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userCtx = useContext(userContext);
    
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await login(email, password);
            console.log('Response:', res);
            if (res.status === 200) {
                console.log('Login successful!');
                toast.success('Login successful!');
                const userData = res.data.user;
                console.log('userdata', userData);
                userCtx?.login(userData);
                setTimeout(() => {
                    navigate('/todo');
                }, 3000);
                // Redirect to dashboard or perform other actions
            }
        } catch (error: any) {
            console.error('Login error:', error.message);
            toast.error(error.message);
            // Show error notification or message to the user
        }
    };
    return (
        <>
        <ToastContainer />
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' height='100vh'>
        <Box display='flex' flexDirection="column" justifyContent='center'>
            <Typography variant="h4" gutterBottom className={mystyles['loginTitle']}>Login</Typography>
            <Typography variant="h6" gutterBottom>Welcome back! Please login to your account.</Typography>
            <Typography>Email</Typography>
            <TextField
                className={mystyles['textField']}
                id="filled-basic"
                label="email"
                variant="filled"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Typography>Password</Typography>
            <TextField
                className={mystyles['textField']}
                label="password"
                variant="filled"
                margin="normal"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Typography>Don't have an account? <Link to='/' style={{textDecoration: 'none'}}>Register</Link></Typography>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Box>
        </Box>
        </>
        )
}

export default Login;