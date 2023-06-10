const User = require('../models/User');
const bcrypt = require("bcryptjs");
const { json } = require('express');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userExists = await User.findOne({ userName });
        if (userExists) {
            return res.status(400).send({ status: true, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const setPassword = await bcrypt.hash(password, salt)

        let user = await User.create({ userName, password: setPassword });
        user = user.toObject();
        delete user.password;
        return res.status(200).json({ success: true, data: user, message: "User created" });
        // res.status(200).send({ status: true, message: "User Created" });
    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }
};

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ status: false, message: "Please provied Username and password" });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2h" }, (error, token) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: false, message: "Failed to generate token" });
            }
            return res.cookie("token", token).json({ status: true, user, auth: token });
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }
};

const profile = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (erro, info) => {
        if (erro) throw erro; // Corrected typo from err to erro
        res.json(info);
    });
};


module.exports = { registerUser, loginUser, profile };
