const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { getGroqChatCompletion } = require("./groq");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  try {
    const payload = req.body; // The incoming payload
    console.log("Received payload:", payload);

    // const externalApiUrl = "https://jsonplaceholder.typicode.com/posts";
    // const response = await axios.get(externalApiUrl, payload);

    const chatCompletion = await getGroqChatCompletion(
      "Can you give me some test cases for json dummy API in Chai.js"
    );
    console.log(chatCompletion.choices[0]?.message?.content || "");

    // const response = await axios.get(externalApiUrl);

    res.status(200).json({
      message: "Data successfully forwarded to external API",
      data: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Error calling external API:", error.message);

    // Handle errors
    res.status(500).json({
      message: "Failed to forward data to external API",
      error: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
