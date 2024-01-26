const express = require('express');
const router = express.Router();
const User = require('../model/User.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const authenticateToken = require('./Middleware.js');
require('dotenv').config({ "path": "../.env" });


router.post("/sign-up", async (req, res) => {
    try {
        let body = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.password, salt);
        body.password = hash;
        await User.create(body);
        res.json("");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const foundUser = await User.findOne({ username: body.username });
        if (foundUser) {

            const match = await bcrypt.compare(body.password, foundUser.password);

            if (match) {

                const token = jwt.sign(
                    { userId: foundUser._id, username: foundUser.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.json({ token });
            } else {
                res.status(401).json("Ungültige Anmeldedaten");
            }
        } else {
            res.status(404).json("Benutzer nicht gefunden");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/get/userDTO", authenticateToken, async (req, res) => {
    try {

        const foundUser = await User.findOne({ username: req.user.username });

        const userDTO = {
            username: foundUser.username,
            email: foundUser.email,
            premium: foundUser.premium,
        }

        res.json(userDTO);
    } catch (error) {
        res.status(500).send(error.message);
    }
})




module.exports = router;