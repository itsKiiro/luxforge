const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
require('dotenv').config({ "path": "../.env" });

const openAi = new OpenAI({ apiKey: process.env.API_KEY });


router.post("/generate/text", async (req, res) => {
	const userInput = req.body.input;
	const firstAnswerIndex = 0;
    try {
        const openAiResponse = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: userInput }],
        });

        res.json({
            reply: openAiResponse.choices[firstAnswerIndex],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;