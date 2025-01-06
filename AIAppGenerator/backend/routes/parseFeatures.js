const OpenAIApi = require("openai");
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const openai = new OpenAIApi.OpenAI({
  key: "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",
});

router.post("/", async (req, res) => {
  const userInput = req.body.userInput;

  if (!userInput || typeof userInput !== "string") {
    return res.status(400).send("Invalid user input");
  }

  try {
    const response = await openai.completions.create({
      model: "gpt-4o-mini",
      prompt: userInput,
      store: true,
      max_tokens: 2048,
    });

    if (!response || !response.choices) {
      return res.status(500).send("Error generating features");
    }

    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating features");
  }
});

module.exports = router;
