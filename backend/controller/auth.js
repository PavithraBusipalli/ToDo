const express = require('express');
const  User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        console.log("Signup route hit"); 
        const {name, email, password} = req.body
        console.log('req: ', req);
        const isUserExist = await User.findOne({email});
        if(isUserExist) {
            return res.status(401).json({
                success: false,
                message: 'User has already exists!'
            })
        }  
        const hashPswd = await bcrypt.hash(password, 10) ;
        const newUser = new User({name, email, password: hashPswd});
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully!'
        })
        
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e.message
        })
    }
}

const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }
        const isPswdMatch = await bcrypt.compare(password, user.password);
        if(!isPswdMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true on HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {id: user.id, name: user.name, email: user.email},
        });
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


module.exports = {
    signup, 
    signin,
} 