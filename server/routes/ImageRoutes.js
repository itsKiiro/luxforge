const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
require('dotenv').config({ "path": "../.env" });

const openAi = new OpenAI({ apiKey: process.env.API_KEY });


router.post("/generate/image", async (req, res) => {
	const userInput = req.body.input;
    const model = req.body.model;
    const size = req.body.size;

    try {
        const response = await openAi.images.generate({
            model: model,
            prompt: userInput,
            n: 1,
            size: size,
        });
        
        const image_url = response.data[0].url;

        res.json({
            reply: image_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;