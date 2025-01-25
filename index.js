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

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.post("/submit", async (req, res) => {
  try {
    const payload = req.body; // The incoming payload
    console.log("Received payload:", payload);

    // const externalApiUrl = "https://jsonplaceholder.typicode.com/posts";
    // const response = await axios.get(externalApiUrl, payload);

    const requirement = `
This is a ${payload.method} api with URL ${payload.url} and parameters ${payload.body} and payload ${payload.payload}.
My successful response is ${payload.parsedSuccessResponse}
My fail response is ${payload.parsedErrorResponse}
now write testcases in Chai.js 
Test Case Structure:
Each test case should follow this format:
Test Case Description (e.g., "Verify the API returns a 200 OK status code").
Expected Result (e.g., "Status code is 200").
Test Assertion (e.g., chai.expect(response.status).to.equal(200);).
Test Case Types:
Positive Test Cases: Valid requests and correct responses.
Negative Test Cases: Invalid requests (e.g., missing parameters, incorrect data).
Error Handling: Responses when the API fails (e.g., invalid token, bad request).
Boundary Testing: Test cases with edge values (e.g., very large or small numbers, long strings).

Example Output that i expect from you.
API Request:
• Method: ${payload.method}
• URL: ${payload.url}
• Headers: ${payload.headers}
• Query Parameters: None

Sample Response:
• Success Response:${payload.parsedSuccessResponse}
• Error Response:${payload.parsedErrorResponse}

Generated Test Cases:
1. Test Case 1: Validate Successful Response (200 ΟΚ)
• Expected Result: Status code is 200
• Chai Assertion:
chai.expect(response.status).to.equal(200);
2.
3. Test Case 2: Validate Response Body Structure
• Expected Result: Response should include userld, id, title, and body fields.
• Chai Assertion:
chai.expect(response.body[0]).
to.have.all.keys('userld', 'id', 'title', 'body');
5. Test Case 3: Handle Unauthorized Error (401 Unauthorized)
• Expected Result: Status code is 401 and error message is Unauthorized.
• Chai Assertion:
chai.expect(response.status).to.equal(401);
chai.expect(response.body.error).to.equal('Unauthorized');`;
    console.log("AI API Call Started", requirement);
    const chatCompletion = await getGroqChatCompletion(requirement);
    console.log(chatCompletion.choices[0]?.message?.content || "");

    // const response = await axios.get(externalApiUrl);

    res.status(200).json({
      message: "Data successfully forwarded to external API",
      data: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Error calling external API:", error.message);
    res.status(500).json({
      message: "Failed to forward data to external API",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
