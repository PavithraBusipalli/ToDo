import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { register } from "../../service/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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
            <Box display={"flex"} flexDirection={'column'}>
                {/* <Typography>User Name</Typography> */}
                <TextField
                    label="User Name"
                    variant="filled"
                    margin="normal"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {/* <Typography>Email</Typography> */}
                <TextField
                    label="Email"
                    variant="filled"
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {/* <Typography>Password</Typography> */}
                <TextField
                    label="Password"
                    variant="filled"
                    margin="normal"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Typography>Already have an account <Link to='/signin'>Login</Link></Typography>
                <Button variant="outlined" onClick={handleSubmit}>Register</Button>
            </Box>
        </Box>
        </>
    )
}

export default Register;