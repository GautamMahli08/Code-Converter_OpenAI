const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route for Code Conversion
app.post("/convert", async (req, res) => {
  const { code, fromLanguage, toLanguage } = req.body;

  if (!code || !fromLanguage || !toLanguage) {
    return res.status(400).json({ error: "Missing required fields: code, fromLanguage, toLanguage" });
  }

  try {
    // Call the Google Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Convert this ${fromLanguage} code to ${toLanguage}:\n\n${code}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the converted code from the response
    const convertedCode = response.data.candidates[0].content.parts[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error("Error calling Gemini API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to convert code", details: error.response ? error.response.data : error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});