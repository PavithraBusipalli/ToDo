import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { register } from "../../service/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import mystyles from './RegisterStyles.module.scss';

const Register= () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: ''
    })
    // const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const response = await register(formData.name, formData.email, formData.password);
            console.log('response: ', response);
            toast.success("Registration successful!");
            // navigate('/signin');
        } catch(e) {
            toast.error("Registration Failed. Please try again.")
        }
    }

    return (
        <>
        <ToastContainer />
        <Box display={"flex"} flexDirection={"row"} justifyContent={'center'} alignItems={"center"} height={'100vh'}>
            <Box display={"flex"} flexDirection={'column'} className={mystyles['container']}>
            <Typography variant="h5">Do Register yourself here..! Let's Go..</Typography>
                {/* <Typography>User Name</Typography> */}
                <TextField
                    className={mystyles['textField']}
                    label="User Name"
                    variant="filled"
                    margin="normal"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {/* <Typography>Email</Typography> */}
                <TextField
                    className={mystyles['textField']}
                    label="Email"
                    variant="filled"
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {/* <Typography>Password</Typography> */}
                <TextField
                    className={mystyles['textField']}
                    label="Password"
                    variant="filled"
                    margin="normal"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Typography style={{ marginTop: '4%', marginBottom: '5%', textAlign:'center'}}>Already have an account <Link to='/signin'>Login</Link></Typography>
                <Button variant="outlined" onClick={handleSubmit}>Register</Button>
            </Box>
        </Box>
        </>
    )
}

export default Register;